import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../utilities/getZorn';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { EngineVoqueLocator } from './engineVoqueLocator';

type BaseEstinantVoqueRelationship = {
  estinantLocator: EngineEstinantLocator2;
  voqueLocator: EngineVoqueLocator;
  // An estinant can reference a voque multiple times
  distinguisher: string;
};

type EstinantVoqueRelationshipPrototype = {
  get zorn(): string;
};

/**
 * The information needed to find a Voque definition, and subsequently a
 * hubblepup definition
 */
type EstinantVoqueRelationship = ObjectWithPrototype<
  BaseEstinantVoqueRelationship,
  EstinantVoqueRelationshipPrototype
>;

export const { EstinantVoqueRelationshipInstance } =
  buildConstructorFunctionWithName('EstinantVoqueRelationshipInstance')<
    BaseEstinantVoqueRelationship,
    EstinantVoqueRelationshipPrototype
  >({
    zorn: (relatinoship) => {
      return getZorn([
        relatinoship.voqueLocator.zorn,
        relatinoship.estinantLocator.zorn,
        relatinoship.distinguisher,
      ]);
    },
  });

export const ESTINANT_VOQUE_RELATIONSHIP_GEPP = 'estinant-voque-relationship';

type EstinantVoqueRelationshipGepp = typeof ESTINANT_VOQUE_RELATIONSHIP_GEPP;

export type EstinantVoqueRelationshipVoque = InMemoryOdeshin2Voque<
  EstinantVoqueRelationshipGepp,
  EstinantVoqueRelationship
>;
