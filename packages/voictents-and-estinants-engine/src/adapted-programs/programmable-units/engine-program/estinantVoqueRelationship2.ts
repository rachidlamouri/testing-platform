import { InMemoryOdeshin2ListVoque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getZorn } from '../../../layer-agnostic-utilities/deprecated-zorn/getZorn';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { EngineVoqueLocator2 } from './engineVoqueLocator2';

type BaseEstinantVoqueRelationship2 = {
  estinantLocator: EngineEstinantLocator2;
  voqueLocator: EngineVoqueLocator2;
  // An estinant can reference a voque multiple times
  distinguisher: string;
};

type EstinantVoqueRelationship2Prototype = {
  get zorn(): string;
};

/**
 * A model of the connection between a transform and a collection meta type
 */
type EstinantVoqueRelationship2 = ObjectWithPrototype<
  BaseEstinantVoqueRelationship2,
  EstinantVoqueRelationship2Prototype
>;

export const { EstinantVoqueRelationship2Instance } =
  buildConstructorFunctionWithName('EstinantVoqueRelationship2Instance')<
    BaseEstinantVoqueRelationship2,
    EstinantVoqueRelationship2Prototype
  >({
    zorn: (relatinoship) => {
      return getZorn([
        relatinoship.voqueLocator.zorn,
        relatinoship.estinantLocator.zorn.forHuman,
        relatinoship.distinguisher,
      ]);
    },
  });

export const ESTINANT_VOQUE_RELATIONSHIP_2_GEPP =
  'estinant-voque-relationship-2';

type EstinantVoqueRelationship2Gepp = typeof ESTINANT_VOQUE_RELATIONSHIP_2_GEPP;

export type EstinantVoqueRelationship2Voque = InMemoryOdeshin2ListVoque<
  EstinantVoqueRelationship2Gepp,
  EstinantVoqueRelationship2
>;
