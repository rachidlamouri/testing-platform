import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../utilities/getZorn';
import { EngineVoqueLocator } from './engineVoqueLocator';

type BaseProgramVoqueRelationship = {
  programName: string;
  voqueLocator: EngineVoqueLocator;
};

type ProgramVoqueRelationshipPrototype = {
  get zorn(): string;
};

/**
 * The information needed to find a Voque definition, and subsequently a
 * hubblepup definition
 */
type ProgramVoqueRelationship = ObjectWithPrototype<
  BaseProgramVoqueRelationship,
  ProgramVoqueRelationshipPrototype
>;

export const { ProgramVoqueRelationshipInstance } =
  buildConstructorFunctionWithName('ProgramVoqueRelationshipInstance')<
    BaseProgramVoqueRelationship,
    ProgramVoqueRelationshipPrototype
  >({
    zorn: (relatinoship) => {
      return getZorn([
        relatinoship.voqueLocator.zorn,
        relatinoship.programName,
      ]);
    },
  });

export const PROGRAM_VOQUE_RELATIONSHIP_GEPP = 'program-voque-relationship';

type ProgramVoqueRelationshipGepp = typeof PROGRAM_VOQUE_RELATIONSHIP_GEPP;

export type ProgramVoqueRelationshipVoque = InMemoryOdeshin2Voque<
  ProgramVoqueRelationshipGepp,
  ProgramVoqueRelationship
>;
