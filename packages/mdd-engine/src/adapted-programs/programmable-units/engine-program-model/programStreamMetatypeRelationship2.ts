import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineStreamMetatypeLocator2 } from './engineStreamMetatypeLocator2';

type BaseProgramStreamMetatypeRelationship2 = {
  programName: string;
  streamMetatypeLocator: EngineStreamMetatypeLocator2;
  rootGraphLocator: RootGraphLocator;
  parentId: string;
};

type ProgramStreamMetatypeRelationship2Prototype = {
  get id(): string;
};

/**
 * Models the relationship between a collection and a program that uses that
 * collection
 *
 * @readableName ProgramStreamMetatypeRelationship
 */
type ProgramStreamMetatypeRelationship2 = ObjectWithPrototype<
  BaseProgramStreamMetatypeRelationship2,
  ProgramStreamMetatypeRelationship2Prototype
>;

export const { ProgramStreamMetatypeRelationship2Instance } =
  buildConstructorFunctionWithName('ProgramVoqueRelationship2Instance')<
    BaseProgramStreamMetatypeRelationship2,
    ProgramStreamMetatypeRelationship2Prototype
  >({
    id: (relationship) => {
      return getId([
        relationship.streamMetatypeLocator.id,
        relationship.programName,
      ]);
    },
  });

export const PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID =
  'program-voque-relationship-2';

type ProgramStreamMetatypeRelationship2CollectionId =
  typeof PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID;

export type ProgramStreamMetatypeRelationship2StreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramStreamMetatypeRelationship2CollectionId,
    ProgramStreamMetatypeRelationship2
  >;
