import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';
import { EngineVoqueLocator2 } from './engineVoqueLocator2';

type BaseEstinantVoqueRelationship2 = {
  estinantLocator: EngineEstinantLocator2;
  voqueLocator: EngineVoqueLocator2;
  // An estinant can reference a voque multiple times
  distinguisher: string;
};

type EstinantVoqueRelationship2Prototype = {
  get id(): string;
};

/**
 * A model of the connection between a transform and a collection meta type
 *
 * @readableName ProgrammedTransformStreamMetatypeRelationship
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
    id: (relationship) => {
      return getId([
        relationship.voqueLocator.id,
        relationship.estinantLocator.id.forHuman,
        relationship.distinguisher,
      ]);
    },
  });

export const ESTINANT_VOQUE_RELATIONSHIP_2_GEPP =
  'estinant-voque-relationship-2';

type EstinantVoqueRelationship2Gepp = typeof ESTINANT_VOQUE_RELATIONSHIP_2_GEPP;

export type EstinantVoqueRelationship2Voque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    EstinantVoqueRelationship2Gepp,
    EstinantVoqueRelationship2
  >;
