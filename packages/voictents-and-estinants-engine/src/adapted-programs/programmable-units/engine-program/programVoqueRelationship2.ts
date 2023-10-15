import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineVoqueLocator2 } from './engineVoqueLocator2';

type BaseProgramVoqueRelationship2 = {
  programName: string;
  streamMetatypeLocator: EngineVoqueLocator2;
  rootGraphLocator: RootGraphLocator;
  parentId: string;
};

type ProgramVoqueRelationship2Prototype = {
  get id(): string;
};

/**
 * Models the relationship between a collection and a program that uses that
 * collection
 *
 * @readableName ProgramStreamMetatypeRelationship
 */
type ProgramVoqueRelationship2 = ObjectWithPrototype<
  BaseProgramVoqueRelationship2,
  ProgramVoqueRelationship2Prototype
>;

export const { ProgramVoqueRelationship2Instance } =
  buildConstructorFunctionWithName('ProgramVoqueRelationship2Instance')<
    BaseProgramVoqueRelationship2,
    ProgramVoqueRelationship2Prototype
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

type ProgramVoqueRelationship2Gepp =
  typeof PROGRAM_STREAM_METATYPE_RELATIONSHIP_2_COLLECTION_ID;

export type ProgramStreamMetatypeRelationship2StreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramVoqueRelationship2Gepp,
    ProgramVoqueRelationship2
  >;
