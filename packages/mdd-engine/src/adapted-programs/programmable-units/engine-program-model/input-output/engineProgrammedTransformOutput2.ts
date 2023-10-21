import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getTextDigest } from '../../../../package-agnostic-utilities/string/getTextDigest';
import { getId } from '../../../../layer-agnostic-utilities/deprecated-id/getId';
import { EngineProgrammedTransformLocator2 } from '../engineProgrammedTransformLocator2';
import { EngineStreamMetatypeLocator2 } from '../engineStreamMetatypeLocator2';

type BaseProgrammedTransformOutput2 = {
  // TODO: delete "voictentName" in favor of "voqueLocator"
  collectionName: string;
  streamMetatypeLocator?: EngineStreamMetatypeLocator2;
  isInput: false;
  index?: never;
  programmedTransformLocator: EngineProgrammedTransformLocator2;
  programmedTransformName: string;
};

type ProgrammedTransformOutput2Prototype = {
  get id(): string;
  get oldId(): string;
};

/**
 * The model of a transform output
 *
 * @readableName ProgrammedTransformOutputStreamModel
 */
export type EngineProgrammedTransformOutput2 = ObjectWithPrototype<
  BaseProgrammedTransformOutput2,
  ProgrammedTransformOutput2Prototype
>;

export const { ProgrammedTransformOutput2Instance } =
  buildConstructorFunctionWithName('EstinantOutput2Instance')<
    BaseProgrammedTransformOutput2,
    ProgrammedTransformOutput2Prototype
  >({
    id: (output) => {
      return getId([
        'output',
        output.collectionName,
        output.programmedTransformLocator.id.forHuman,
      ]);
    },
    oldId: (output) => {
      return getTextDigest(output.id);
    },
  });

export const PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID = 'estinant-output-2';

type ProgrammedTransformOutput2CollectionId =
  typeof PROGRAMMED_TRANSFORM_OUTPUT_2_COLLECTION_ID;

export type EngineProgrammedTransformOutput2StreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformOutput2CollectionId,
    EngineProgrammedTransformOutput2
  >;
