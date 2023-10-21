import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { TypeScriptObject } from '../../../package-agnostic-utilities/object/typeScriptObject';
import {
  MessageAccessorInputFromAccessor,
  RuleId,
  UnsafeTypedRule,
} from './rule';
import { Source } from './source/source';

const LINT_ASSERTION_ID_TEMPLATE = [
  ['rule', RuleId],
  ['lintSource', ComplexId.ANY],
] as const satisfies GenericComplexIdTemplate;
type LintAssertionIdTemplate = typeof LINT_ASSERTION_ID_TEMPLATE;
export class LintAssertionId extends ComplexId<LintAssertionIdTemplate> {
  get rawTemplate(): LintAssertionIdTemplate {
    return LINT_ASSERTION_ID_TEMPLATE;
  }
}

type SuccessfulLintAssertionResult = {
  isValid: true;
  errorMessage: null;
};

type FailedLintAssertionResult = {
  isValid: false;
  errorMessage: string;
};

type LintAssertionResult =
  | SuccessfulLintAssertionResult
  | FailedLintAssertionResult;

type LintAssertionConstructorInput<TTypedRule extends UnsafeTypedRule> = {
  rule: TTypedRule;
  lintSource: Source;
  isValid: boolean;
  errorMessageContext: MessageAccessorInputFromAccessor<
    TTypedRule['getErrorMessage']
  >;
  context: TypeScriptObject;
};

/**
 * An instance of a rule applied to a lint source. It contains the result of the
 * assertion (positive or negative) as well as the context for a reporter to
 * report the issue.
 */
export class LintAssertion<TTypedRule extends UnsafeTypedRule> {
  public readonly id: LintAssertionId;

  public readonly rule: TTypedRule;

  public readonly lintSource: Source;

  public readonly result: LintAssertionResult;

  public readonly context: TypeScriptObject;

  constructor(input: LintAssertionConstructorInput<TTypedRule>) {
    const { rule, lintSource, isValid, errorMessageContext } = input;

    let result: LintAssertionResult;
    if (isValid) {
      result = {
        isValid,
        errorMessage: null,
      };
    } else {
      result = {
        isValid,
        errorMessage: rule.getErrorMessage(errorMessageContext),
      };
    }

    this.id = new LintAssertionId({
      rule,
      lintSource,
    });
    this.rule = rule;
    this.lintSource = lintSource;
    this.result = result;
    this.context = input.context;
  }
}

export type GenericLintAssertion = LintAssertion<UnsafeTypedRule>;

export const LINT_ASSERTION_COLLECTION_ID = 'lint-assertion';

type LintAssertionCollectionId = typeof LINT_ASSERTION_COLLECTION_ID;

export type LintAssertionStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    LintAssertionCollectionId,
    GenericLintAssertion
  >;
