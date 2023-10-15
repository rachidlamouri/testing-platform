import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../../layer-agnostic-utilities/deprecated-id/getId';
import { RootGraphLocator } from '../../graph-visualization/directed-graph/rootGraphLocator';
import { EngineEstinantLocator2 } from '../engineEstinantLocator2';

type BaseProgramEstinantOutputRelationship = {
  outputId: string;
  programmedTransformLocator: EngineEstinantLocator2;
  rootGraphLocator: RootGraphLocator;
};

type ProgramEstinantOutputRelationshipPrototype = {
  get id(): string;
};

/**
 * Defines a relationship between a program and a transform output
 *
 * @readableName ProgramTransformOutputStreamRelationship
 */
type ProgramEstinantOutputRelationship = ObjectWithPrototype<
  BaseProgramEstinantOutputRelationship,
  ProgramEstinantOutputRelationshipPrototype
>;

export const { ProgramEstinantOutputRelationshipInstance } =
  buildConstructorFunctionWithName('ProgramEstinantOutputRelationshipInstance')<
    BaseProgramEstinantOutputRelationship,
    ProgramEstinantOutputRelationshipPrototype
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

type ProgramEstinantOutputRelationshipGepp =
  typeof PROGRAM_PROGRAMMED_TRANSFORM_OUTPUT_RELATIONSHIP_COLLECTION_ID;

export type ProgramProgrammedTransformOutputRelationshipStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramEstinantOutputRelationshipGepp,
    ProgramEstinantOutputRelationship
  >;
