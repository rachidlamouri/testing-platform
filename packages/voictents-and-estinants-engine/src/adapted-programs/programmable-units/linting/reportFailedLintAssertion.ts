import { assertNotNull } from '../../../package-agnostic-utilities/nil/assertNotNull';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from '../error/programError';
import {
  GenericLintAssertion,
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertionStreamMetatype,
} from './lintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionStreamMetatype,
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
export const reportFailedLintAssertion = buildProgrammedTransform({
  name: 'reportFailedLintAssertion',
})
  .fromItem2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .andFromCollection2<LintAssertionOmissionStreamMetatype>({
    collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((lintAssertion, omissionVoictent) => {
    const isOmitted = omissionVoictent.omittedZornSet.has(
      lintAssertion.id.forHuman,
    );

    if (isOmitted || lintAssertion.result.isValid) {
      return [];
    }

    return [new LintAssertionError(lintAssertion)];
  })
  .assemble();
