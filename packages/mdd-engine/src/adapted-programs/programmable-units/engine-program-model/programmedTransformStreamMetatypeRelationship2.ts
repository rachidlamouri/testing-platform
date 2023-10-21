import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import { EngineProgrammedTransformLocator2 } from './engineProgrammedTransformLocator2';
import { EngineStreamMetatypeLocator2 } from './engineStreamMetatypeLocator2';

type BaseProgrammedTransformStreamMetatypeRelationship2 = {
  programmedTransformLocator: EngineProgrammedTransformLocator2;
  streamMetatypeLocator: EngineStreamMetatypeLocator2;
  // An estinant can reference a voque multiple times
  distinguisher: string;
};

type ProgrammedTransformStreamMetatypeRelationship2Prototype = {
  get id(): string;
};

/**
 * A model of the connection between a transform and a collection meta type
 *
 * @readableName ProgrammedTransformStreamMetatypeRelationship
 */
type ProgrammedTransformStreamMetatypeRelationship2 = ObjectWithPrototype<
  BaseProgrammedTransformStreamMetatypeRelationship2,
  ProgrammedTransformStreamMetatypeRelationship2Prototype
>;

export const { ProgrammedTransformStreamMetatypeRelationship2Instance } =
  buildConstructorFunctionWithName('EstinantVoqueRelationship2Instance')<
    BaseProgrammedTransformStreamMetatypeRelationship2,
    ProgrammedTransformStreamMetatypeRelationship2Prototype
  >({
    id: (relationship) => {
      return getId([
        relationship.streamMetatypeLocator.id,
        relationship.programmedTransformLocator.id.forHuman,
        relationship.distinguisher,
      ]);
    },
  });

export const PROGRAMMED_TRANSFORM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID =
  'estinant-voque-relationship-2';

type ProgrammedTransformStreamMetatypeRelationship2CollectionId =
  typeof PROGRAMMED_TRANSFORM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID;

export type ProgrammedTransformStreamMetatypeRelationship2StreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgrammedTransformStreamMetatypeRelationship2CollectionId,
    ProgrammedTransformStreamMetatypeRelationship2
  >;
