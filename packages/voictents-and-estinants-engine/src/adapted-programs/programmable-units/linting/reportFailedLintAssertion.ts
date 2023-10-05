import { assertNotNull } from '../../../package-agnostic-utilities/nil/assertNotNull';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
} from '../error/programError';
import {
  GenericLintAssertion,
  LINT_ASSERTION_GEPP,
  LintAssertionVoque,
} from './lintAssertion';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionVoque,
} from './lintAssertionOmission';

export class LintAssertionError extends Error {
  // TODO: make a subclass of Error that has this path
  public contextFilePath?: string;

  constructor(public readonly lintAssertion: GenericLintAssertion) {
    assertNotNull(lintAssertion.result.errorMessage);

    super(lintAssertion.result.errorMessage);
  }

  public setContextFilePath(filePath: string): void {
    this.contextFilePath = filePath;
  }
}

/**
 * Forwards failed LintAssertion objects to the error collection. Ignors lint
 * assertions with an entry in the LintAssertionOmission collection
 */
export const reportFailedLintAssertion = buildEstinant({
  name: 'reportFailedLintAssertion',
})
  .fromHubblepup2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .andFromVoictent2<LintAssertionOmissionVoque>({
    gepp: LINT_ASSERTION_OMISSION_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((lintAssertion, omissionVoictent) => {
    const isOmitted = omissionVoictent.omittedZornSet.has(
      lintAssertion.zorn.forHuman,
    );

    if (isOmitted || lintAssertion.result.isValid) {
      return [];
    }

    return [new LintAssertionError(lintAssertion)];
  })
  .assemble();
