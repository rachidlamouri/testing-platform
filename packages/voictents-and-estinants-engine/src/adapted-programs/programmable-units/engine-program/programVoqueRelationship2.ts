import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/deprecated-constructor-function/buildConstructorFunction';
import { getZorn } from '../../../utilities/deprecated-zorn/getZorn';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineVoqueLocator2 } from './engineVoqueLocator2';

type BaseProgramVoqueRelationship2 = {
  programName: string;
  voqueLocator: EngineVoqueLocator2;
  rootGraphLocator: RootGraphLocator;
  parentId: string;
};

type ProgramVoqueRelationship2Prototype = {
  get zorn(): string;
};

/**
 * Models the relationship between a collection and a program that uses that
 * collection
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
    zorn: (relatinoship) => {
      return getZorn([
        relatinoship.voqueLocator.zorn,
        relatinoship.programName,
      ]);
    },
  });

export const PROGRAM_VOQUE_RELATIONSHIP_2_GEPP = 'program-voque-relationship-2';

type ProgramVoqueRelationship2Gepp = typeof PROGRAM_VOQUE_RELATIONSHIP_2_GEPP;

export type ProgramVoqueRelationship2Voque = InMemoryOdeshin2ListVoque<
  ProgramVoqueRelationship2Gepp,
  ProgramVoqueRelationship2
>;
