import { assertNotNull } from '../../../package-agnostic-utilities/nil/assertNotNull';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
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
  constructor(public readonly lintAssertion: GenericLintAssertion) {
    assertNotNull(lintAssertion.result.errorMessage);

    super(lintAssertion.result.errorMessage);
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
