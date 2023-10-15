import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
  memoizeGetter,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';
import {
  EngineEstinantLocator2,
  EngineEstinantLocator2ZornClassSet,
} from '../engineEstinantLocator2';
import { EngineVoqueLocator2 } from '../engineVoqueLocator2';

const ENGINE_ESTINANT_INPUT_2_ZORN_TEMPLATE = [
  'inputIndex',
  'voictentName',
  ['estinantLocator', ...EngineEstinantLocator2ZornClassSet],
] as const satisfies GenericComplexIdTemplate;
type EngineEstinantInput2ZornTemplate =
  typeof ENGINE_ESTINANT_INPUT_2_ZORN_TEMPLATE;
export class EngineEstinantInput2Zorn extends ComplexId<EngineEstinantInput2ZornTemplate> {
  get rawTemplate(): EngineEstinantInput2ZornTemplate {
    return ENGINE_ESTINANT_INPUT_2_ZORN_TEMPLATE;
  }
}

type BaseEstinantInput2 = {
  // TODO: delete "voictentName" in favor of "voqueLocator"
  collectionName: string;
  streamMetatypeLocator?: EngineVoqueLocator2;
  isInput: true;
  index: number;
  estinantLocator: EngineEstinantLocator2;
  programmedTransformName: string;
};

type EstinantInput2Prototype = {
  get id(): EngineEstinantInput2Zorn;
  get oldId(): string;
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
  id: memoizeGetter((input) => {
    return new EngineEstinantInput2Zorn({
      inputIndex: `${input.index}`,
      voictentName: input.collectionName,
      estinantLocator: input.estinantLocator.id,
    });
  }),
  oldId: (input) => input.id.forMachine,
});

export const PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID = 'estinant-input-2';

type EstinantInput2Gepp = typeof PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID;

export type EngineProgrammedTransformInput2StreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EstinantInput2Gepp,
    EngineEstinantInput2
  >;
