import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { RootGraphLocator } from '../../graph-visualization/directed-graph/rootGraphLocator';
import { EngineEstinantLocator2 } from '../engineEstinantLocator2';

type BaseProgramEstinantOutputRelationship = {
  outputZorn: string;
  estinantLocator: EngineEstinantLocator2;
  rootGraphLocator: RootGraphLocator;
};

type ProgramEstinantOutputRelationshipPrototype = {
  get zorn(): string;
};

/**
 * Defines a relationship between a program and a transform output
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
    zorn: (relationship) => {
      return getZorn([
        relationship.rootGraphLocator.zorn.forHuman,
        relationship.outputZorn,
      ]);
    },
  });

export const PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP =
  'program-estinant-output-relationship';

type ProgramEstinantOutputRelationshipGepp =
  typeof PROGRAM_ESTINANT_OUTPUT_RELATIONSHIP_GEPP;

export type ProgramEstinantOutputRelationshipVoque = InMemoryOdeshin2Voque<
  ProgramEstinantOutputRelationshipGepp,
  ProgramEstinantOutputRelationship
>;
