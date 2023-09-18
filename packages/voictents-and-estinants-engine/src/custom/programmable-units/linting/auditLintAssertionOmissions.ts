import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  GenericProgramErrorVoque,
  PROGRAM_ERROR_GEPP,
} from '../error/programError';
import {
  LINT_ASSERTION_GEPP,
  LintAssertion,
  LintAssertionVoque,
} from './lintAssertion';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionVoque,
} from './lintAssertionOmission';
import { LintAssertionError } from './reportFailedLintAssertion';
import { TypedRule } from './rule';
import { EstinantSourceInstance } from './source/estinantSource';

const ESTINANT_NAME = 'auditLintAssertionOmissions' as const;

type OmissionIsValidRuleMessageContext = Record<string, never>;
const omissionIsValidRule = new TypedRule<OmissionIsValidRuleMessageContext>({
  name: 'omission-is-valid',
  source: new EstinantSourceInstance({
    filePath: __filename,
    estinantName: ESTINANT_NAME,
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
export const auditLintAssertionOmissions = buildEstinant({
  name: ESTINANT_NAME,
})
  .fromVoictent2<LintAssertionOmissionVoque>({
    gepp: LINT_ASSERTION_OMISSION_GEPP,
  })
  .andFromVoictent2<LintAssertionVoque>({
    gepp: LINT_ASSERTION_GEPP,
  })
  .toHubblepupTuple2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((omissionVoictent, assertionVoictent) => {
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
