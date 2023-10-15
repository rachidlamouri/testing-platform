import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../../layer-agnostic-utilities/deprecated-id/getId';
import { RootGraphLocator } from '../../graph-visualization/directed-graph/rootGraphLocator';
import { EngineProgrammedTransformLocator2 } from '../engineEstinantLocator2';

type BaseProgramProgrammedTransformOutputRelationship = {
  outputId: string;
  programmedTransformLocator: EngineProgrammedTransformLocator2;
  rootGraphLocator: RootGraphLocator;
};

type ProgramProgrammedTransformOutputRelationshipPrototype = {
  get id(): string;
};

/**
 * Defines a relationship between a program and a transform output
 *
 * @readableName ProgramTransformOutputStreamRelationship
 */
type ProgramProgrammedTransformOutputRelationship = ObjectWithPrototype<
  BaseProgramProgrammedTransformOutputRelationship,
  ProgramProgrammedTransformOutputRelationshipPrototype
>;

export const { ProgramProgrammedTransformOutputRelationshipInstance } =
  buildConstructorFunctionWithName('ProgramEstinantOutputRelationshipInstance')<
    BaseProgramProgrammedTransformOutputRelationship,
    ProgramProgrammedTransformOutputRelationshipPrototype
  >({
    id: (relationship) => {
      return getId([
        relationship.rootGraphLocator.id.forHuman,
        relationship.outputId,
      ]);
    },
  });

export const PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID =
  'program-estinant-output-relationship';

type ProgramProgrammedTransformOutputRelationshipCollectionId =
  typeof PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID;

export type ProgramProgrammedTransformOutputRelationshipStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramProgrammedTransformOutputRelationshipCollectionId,
    ProgramProgrammedTransformOutputRelationship
  >;
