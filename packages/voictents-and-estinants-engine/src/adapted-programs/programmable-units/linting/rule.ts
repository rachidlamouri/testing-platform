import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../utilities/types/simplify';
import { TypeScriptObject } from '../../../utilities/typed-datum/type-script/object';
import { Source } from './source/source';

const RULE_ZORN_TEMPLATE = [
  ['source', Zorn2.ANY],
  'name',
] as const satisfies GenericZorn2Template;
type RuleZornTemplate = typeof RULE_ZORN_TEMPLATE;
export class RuleZorn extends Zorn2<RuleZornTemplate> {
  get rawTemplate(): RuleZornTemplate {
    return RULE_ZORN_TEMPLATE;
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

type Rule = SimplifyN<
  [
    {
      zorn: RuleZorn;
    },
    RuleConstructorInput,
  ]
>;

const { RuleInstance } = buildNamedConstructorFunction({
  constructorName: 'RuleInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'source',
    'name',
    'description',
  ] as const satisfies readonly (keyof Rule)[],
})
  .withTypes<RuleConstructorInput, Rule>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { source, name } = input;

      const zorn = new RuleZorn({
        source: source.zorn,
        name,
      });

      return {
        zorn,
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
