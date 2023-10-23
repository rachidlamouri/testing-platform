import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineProgrammedTransformLocator2 } from './engineProgrammedTransformLocator2';

type BaseProgramProgrammedTransformRelationship = {
  programName: string;
  programmedTransformLocator: EngineProgrammedTransformLocator2;
  rootGraphLocator: RootGraphLocator;
};

type ProgramProgrammedTransformRelationshipPrototype = {
  get id(): string;
};

/**
 * Defines a relationship between a program and a transform: a transform can
 * appear in more than one program
 *
 * @readableName ProgramProgrammedTransformRelationship
 */
export type ProgramProgrammedTransformRelationship = ObjectWithPrototype<
  BaseProgramProgrammedTransformRelationship,
  ProgramProgrammedTransformRelationshipPrototype
>;

export const { ProgramProgrammedTransformRelationshipInstance } =
  buildConstructorFunctionWithName(
    'ProgramProgrammedTransformRelationshipInstance',
  )<
    BaseProgramProgrammedTransformRelationship,
    ProgramProgrammedTransformRelationshipPrototype
  >({
    id: (relationship) => {
      return getId([
        relationship.programmedTransformLocator.id.forHuman,
        relationship.programName,
      ]);
    },
  });

export const PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID =
  'program-programmed-transform-relationship';

type ProgramProgrammedTransformRelationshipCollectionId =
  typeof PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID;

export type ProgramProgrammedTransformRelationshipStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgramProgrammedTransformRelationshipCollectionId,
    ProgramProgrammedTransformRelationship
  >;
