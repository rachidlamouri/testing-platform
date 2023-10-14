import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
} from '../error/programError';
import {
  LINT_ASSERTION_COLLECTION_ID,
  LintAssertion,
  LintAssertionStreamMetatype,
} from './lintAssertion';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionVoque,
} from './lintAssertionOmission';
import { LintAssertionError } from './reportFailedLintAssertion';
import { TypedRule } from './rule';
import { ProgrammedTransformSourceInstance } from './source/estinantSource';

const ESTINANT_NAME = 'auditLintAssertionOmissions' as const;

type OmissionIsValidRuleMessageContext = Record<string, never>;
const omissionIsValidRule = new TypedRule<OmissionIsValidRuleMessageContext>({
  name: 'omission-is-valid',
  source: new ProgrammedTransformSourceInstance({
    filePath: __filename,
    programmedTransformName: ESTINANT_NAME,
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
  name: ESTINANT_NAME,
})
  .fromCollection2<LintAssertionOmissionVoque>({
    collectionId: LINT_ASSERTION_OMISSION_GEPP,
  })
  .andFromCollection2<LintAssertionStreamMetatype>({
    collectionId: LINT_ASSERTION_COLLECTION_ID,
  })
  .toItemTuple2<GenericProgramErrorVoque>({
    collectionId: PROGRAM_ERROR_GEPP,
  })
  .onTransform((omissionVoictent, assertionVoictent) => {
    const assertionSet = new Set(
      assertionVoictent.map((assertion) => {
        return assertion.zorn.forHuman;
      }),
    );

    const omissionCombination = [
      ...new Map(
        omissionVoictent.list.map((omission) => {
          return [omission.zorn.forHuman, omission];
        }),
      ).values(),
    ];

    const invalidOmissionList = omissionCombination.filter((omission) => {
      return !assertionSet.has(omission.omittedAssertionZorn.forHuman);
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
