import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
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
  EngineProgrammedTransformLocator2,
  EngineProgrammedTransformLocator2IdClassSet,
} from '../engineProgrammedTransformLocator2';
import { EngineStreamMetatypeLocator2 } from '../engineStreamMetatypeLocator2';

const ENGINE_PROGRAMMED_TRANSFORM_INPUT_2_ID_TEMPLATE = [
  'inputIndex',
  'collectionName',
  [
    'programmedTransformLocator',
    ...EngineProgrammedTransformLocator2IdClassSet,
  ],
] as const satisfies GenericComplexIdTemplate;
type EngineProgrammedTransformInput2IdTemplate =
  typeof ENGINE_PROGRAMMED_TRANSFORM_INPUT_2_ID_TEMPLATE;
export class EngineProgrammedTransformInput2Id extends ComplexId<EngineProgrammedTransformInput2IdTemplate> {
  get rawTemplate(): EngineProgrammedTransformInput2IdTemplate {
    return ENGINE_PROGRAMMED_TRANSFORM_INPUT_2_ID_TEMPLATE;
  }
}

type BaseProgrammedTransformInput2 = {
  // TODO: delete "voictentName" in favor of "voqueLocator"
  collectionName: string;
  streamMetatypeLocator?: EngineStreamMetatypeLocator2;
  isInput: true;
  index: number;
  programmedTransformLocator: EngineProgrammedTransformLocator2;
  programmedTransformName: string;
};

type ProgrammedTransformInput2Prototype = {
  get id(): EngineProgrammedTransformInput2Id;
  get oldId(): string;
};

/**
 * The model of a transform input
 *
 * @readableName ProgrammedTransformInputStreamModel
 */
export type EngineProgrammedTransformInput2 = ObjectWithPrototype<
  BaseProgrammedTransformInput2,
  ProgrammedTransformInput2Prototype
>;

export const { ProgrammedTransformInput2Instance } =
  buildConstructorFunctionWithName('EstinantInput2Instance')<
    BaseProgrammedTransformInput2,
    ProgrammedTransformInput2Prototype
  >({
    id: memoizeGetter((input) => {
      return new EngineProgrammedTransformInput2Id({
        inputIndex: `${input.index}`,
        collectionName: input.collectionName,
        programmedTransformLocator: input.programmedTransformLocator.id,
      });
    }),
    oldId: (input) => input.id.forMachine,
  });

export const PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID = 'estinant-input-2';

type ProgrammedTransformInput2CollectionId =
  typeof PROGRAMMED_TRANSFORM_INPUT_2_COLLECTION_ID;

export type EngineProgrammedTransformInput2StreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformInput2CollectionId,
    EngineProgrammedTransformInput2
  >;
