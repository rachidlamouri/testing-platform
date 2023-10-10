import { InMemoryOdeshin2ListVoque } from '../../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
  memoizeGetter,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/data-structure/zorn';
import {
  EngineEstinantLocator2,
  EngineEstinantLocator2ZornClassSet,
} from '../engineEstinantLocator2';
import { EngineVoqueLocator2 } from '../engineVoqueLocator2';

const ENGINE_ESTINANT_INPUT_2_ZORN_TEMPLATE = [
  'inputIndex',
  'voictentName',
  ['estinantLocator', ...EngineEstinantLocator2ZornClassSet],
] as const satisfies GenericComplexzornTemplate;
type EngineEstinantInput2ZornTemplate =
  typeof ENGINE_ESTINANT_INPUT_2_ZORN_TEMPLATE;
export class EngineEstinantInput2Zorn extends Complexzorn<EngineEstinantInput2ZornTemplate> {
  get rawTemplate(): EngineEstinantInput2ZornTemplate {
    return ENGINE_ESTINANT_INPUT_2_ZORN_TEMPLATE;
  }
}

type BaseEstinantInput2 = {
  // TODO: delete "voictentName" in favor of "voqueLocator"
  voictentName: string;
  voqueLocator?: EngineVoqueLocator2;
  isInput: true;
  index: number;
  estinantLocator: EngineEstinantLocator2;
  estinantName: string;
};

type EstinantInput2Prototype = {
  get zorn(): EngineEstinantInput2Zorn;
  get id(): string;
};

/**
 * The model of a transform input
 *
 * @readableName ProgrammedTransformInputStreamModel
 */
export type EngineEstinantInput2 = ObjectWithPrototype<
  BaseEstinantInput2,
  EstinantInput2Prototype
>;

export const { EstinantInput2Instance } = buildConstructorFunctionWithName(
  'EstinantInput2Instance',
)<BaseEstinantInput2, EstinantInput2Prototype>({
  zorn: memoizeGetter((input) => {
    return new EngineEstinantInput2Zorn({
      inputIndex: `${input.index}`,
      voictentName: input.voictentName,
      estinantLocator: input.estinantLocator.zorn,
    });
  }),
  id: (input) => input.zorn.forMachine,
});

export const ESTINANT_INPUT_2_GEPP = 'estinant-input-2';

type EstinantInput2Gepp = typeof ESTINANT_INPUT_2_GEPP;

export type EngineEstinantInput2Voque = InMemoryOdeshin2ListVoque<
  EstinantInput2Gepp,
  EngineEstinantInput2
>;
