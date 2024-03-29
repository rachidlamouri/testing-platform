import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { TypeScriptObject } from '../../../package-agnostic-utilities/object/typeScriptObject';
import { Source } from './source/source';

const RULE_ID_TEMPLATE = [
  ['source', ComplexId.ANY],
  'name',
] as const satisfies GenericComplexIdTemplate;
type RuleIdTemplate = typeof RULE_ID_TEMPLATE;
export class RuleId extends ComplexId<RuleIdTemplate> {
  get rawTemplate(): RuleIdTemplate {
    return RULE_ID_TEMPLATE;
  }
}

type GenericMessageAccessorInput = TypeScriptObject;
type MessageAccessor<TInput extends GenericMessageAccessorInput> = (
  ...args: [TInput]
) => string;
type GenericMessageAccessor = MessageAccessor<GenericMessageAccessorInput>;

export type MessageAccessorInputFromAccessor<
  TAccessor extends GenericMessageAccessor,
> = Parameters<TAccessor>[0];

type RuleConstructorInput = {
  source: Source;
  name: string;
  description: string;
};

/**
 * Symbolizes something that can be enforced against a lint source (which is any
 * Source object). It contains the rule id, description, and information needed
 * to build a precise error message given context
 *
 * @todo this should be UntypedLintRule
 *
 * @todo the canonical declaration should be TypedLintRule (or they should be split into two files)
 *
 * @todo name should probably be the id. we can add namespaces too if needed
 */
type Rule = SimplifyN<
  [
    {
      id: RuleId;
    },
    RuleConstructorInput,
  ]
>;

const { RuleInstance } = buildNamedConstructorFunction({
  constructorName: 'RuleInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'source',
    'name',
    'description',
  ] as const satisfies readonly (keyof Rule)[],
})
  .withTypes<RuleConstructorInput, Rule>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { source, name } = input;

      const id = new RuleId({
        source: source.id,
        name,
      });

      return {
        id,
        ...input,
      } satisfies Rule;
    },
  })
  .assemble();

type TypedRuleConstructorInput<
  TMessageAccessorInput extends GenericMessageAccessorInput,
> = SimplifyN<
  [
    Omit<RuleConstructorInput, 'getErrorMessage'>,
    { getErrorMessage: MessageAccessor<TMessageAccessorInput> },
  ]
>;

export class TypedRule<
  TMessageAccessorInput extends GenericMessageAccessorInput,
> extends RuleInstance {
  public readonly getErrorMessage: MessageAccessor<TMessageAccessorInput>;

  constructor(input: TypedRuleConstructorInput<TMessageAccessorInput>) {
    super(input);

    this.getErrorMessage = input.getErrorMessage;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsafeTypedRule = TypedRule<any>;

export type EmptyMessageContext = Record<string, never>;
