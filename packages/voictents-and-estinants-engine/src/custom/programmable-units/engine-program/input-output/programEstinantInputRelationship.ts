import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { RootGraphLocator } from '../../graph-visualization/directed-graph/rootGraphLocator';
import { EngineEstinantLocator2 } from '../engineEstinantLocator2';

type BaseProgramEstinantInputRelationship = {
  inputZorn: string;
  rootGraphLocator: RootGraphLocator;
  estinantLocator: EngineEstinantLocator2;
};

type ProgramEstinantInputRelationshipPrototype = {
  get zorn(): string;
};

/**
 * Defines a relationship between an program and transform
 */
type ProgramEstinantInputRelationship = ObjectWithPrototype<
  BaseProgramEstinantInputRelationship,
  ProgramEstinantInputRelationshipPrototype
>;

export const { ProgramEstinantInputRelationshipInstance } =
  buildConstructorFunctionWithName('ProgramEstinantInputRelationshipInstance')<
    BaseProgramEstinantInputRelationship,
    ProgramEstinantInputRelationshipPrototype
  >({
    zorn: (relationship) => {
      return getZorn([
        relationship.rootGraphLocator.zorn,
        relationship.inputZorn,
      ]);
    },
  });

export const PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP =
  'program-estinant-input-relationship';

type ProgramEstinantInputRelationshipGepp =
  typeof PROGRAM_ESTINANT_INPUT_RELATIONSHIP_GEPP;

export type ProgramEstinantInputRelationshipVoque = InMemoryOdeshin2Voque<
  ProgramEstinantInputRelationshipGepp,
  ProgramEstinantInputRelationship
>;
