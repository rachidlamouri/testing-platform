import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from '../error/programError';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from './lintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionStreamMetatype,
} from './lintAssertionOmission';
import { LintAssertionError } from './reportFailedLintAssertion';
import { TypedRule } from './rule';
import { ProgrammedTransformSourceInstance } from './source/programmedTransformSource';

const PROGRAMMED_TRANSFORM_NAME = 'auditLintAssertionOmissions' as const;

type OmissionIsValidRuleMessageContext = Record<string, never>;
const omissionIsValidRule = new TypedRule<OmissionIsValidRuleMessageContext>({
  name: 'omission-is-valid',
  source: new ProgrammedTransformSourceInstance({
    filePath: __filename,
    programmedTransformName: PROGRAMMED_TRANSFORM_NAME,
  }),
  description:
    'All lint assertion omissions must target an existing lint assertion',
  getErrorMessage: (): string => {
    return 'Source omitter produced an invalid omission. See context for more details';
  },
});

/**
 * Lints linter omissions for non-existent assertions
 */
export const auditLintAssertionOmissions = buildProgrammedTransform({
  name: PROGRAMMED_TRANSFORM_NAME,
})
  .fromCollection2<LintAssertionOmissionStreamMetatype>({
    collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
  })
  .andFromCollection2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((omissionCollection, assertionCollection) => {
    const assertionSet = new Set(
      assertionCollection.list.map((assertion) => {
        return assertion.id.forHuman;
      }),
    );

    const omissionCombination = [
      ...new Map(
        omissionCollection.list.map((omission) => {
          return [omission.id.forHuman, omission];
        }),
      ).values(),
    ];

    const invalidOmissionList = omissionCombination.filter((omission) => {
      return !assertionSet.has(omission.omittedAssertionId.forHuman);
    });

    const outputList = invalidOmissionList.map((omission) => {
      const lintAssertion = new LintAssertion({
        rule: omissionIsValidRule,
        lintSource: omission.omitterSource,
        isValid: false,
        errorMessageContext: {},
        context: {
          omission,
        },
      });

      return new LintAssertionError(lintAssertion);
    });

    return outputList;
  })
  .assemble();
