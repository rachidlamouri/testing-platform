import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';

type BaseProgramEstinantRelationship = {
  programName: string;
  estinantLocator: EngineEstinantLocator2;
  rootGraphLocator: RootGraphLocator;
};

type ProgramEstinantRelationshipPrototype = {
  get id(): string;
};

/**
 * Defines a relationship between a program and a transform: a transform can
 * appear in more than one program
 *
 * @readableName ProgramProgrammedTransformRelationship
 */
export type ProgramEstinantRelationship = ObjectWithPrototype<
  BaseProgramEstinantRelationship,
  ProgramEstinantRelationshipPrototype
>;

export const { ProgramEstinantRelationshipInstance } =
  buildConstructorFunctionWithName('ProgramEstinantRelationshipInstance')<
    BaseProgramEstinantRelationship,
    ProgramEstinantRelationshipPrototype
  >({
    id: (relationship) => {
      return getId([
        relationship.estinantLocator.id.forHuman,
        relationship.programName,
      ]);
    },
  });

export const PROGRAM_ESTINANT_RELATIONSHIP_GEPP =
  'program-estinant-relationship';

type ProgramEstinantRelationshipGepp =
  typeof PROGRAM_ESTINANT_RELATIONSHIP_GEPP;

export type ProgramEstinantRelationshipVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    ProgramEstinantRelationshipGepp,
    ProgramEstinantRelationship
  >;
