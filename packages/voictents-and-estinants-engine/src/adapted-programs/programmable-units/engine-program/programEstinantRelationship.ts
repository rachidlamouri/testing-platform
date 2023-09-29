import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getZorn } from '../../../layer-agnostic-utilities/deprecated-zorn/getZorn';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';

type BaseProgramEstinantRelationship = {
  programName: string;
  estinantLocator: EngineEstinantLocator2;
  rootGraphLocator: RootGraphLocator;
};

type ProgramEstinantRelationshipPrototype = {
  get zorn(): string;
};

/**
 * Defines a relationship between a program and a transform: a transform can
 * appear in more than one program
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
    zorn: (relationship) => {
      return getZorn([
        relationship.estinantLocator.zorn.forHuman,
        relationship.programName,
      ]);
    },
  });

export const PROGRAM_ESTINANT_RELATIONSHIP_GEPP =
  'program-estinant-relationship';

type ProgramEstinantRelationshipGepp =
  typeof PROGRAM_ESTINANT_RELATIONSHIP_GEPP;

export type ProgramEstinantRelationshipVoque = InMemoryOdeshin2ListVoque<
  ProgramEstinantRelationshipGepp,
  ProgramEstinantRelationship
>;
