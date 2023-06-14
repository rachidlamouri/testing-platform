import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../utilities/getZorn';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineVoqueLocator } from './engineVoqueLocator';

export type BaseEngineVoqueProgramRelationship = {
  rootGraphLocator: RootGraphLocator;
  engineVoqueLocator: EngineVoqueLocator;
  parentId: string;
};

export type EngineVoqueProgramRelationshipPrototype = {
  get zorn(): string;
};

/**
 * Contains the locators for a voque and a graph that references that voque
 */
export type EngineVoqueProgramRelationship = ObjectWithPrototype<
  BaseEngineVoqueProgramRelationship,
  EngineVoqueProgramRelationshipPrototype
>;

export const { EngineVoqueProgramRelationshipInstance } =
  buildConstructorFunctionWithName('EngineVoqueProgramRelationshipInstance')<
    BaseEngineVoqueProgramRelationship,
    EngineVoqueProgramRelationshipPrototype
  >({
    zorn: (relationship) => {
      return getZorn([
        relationship.rootGraphLocator.id,
        relationship.engineVoqueLocator.id,
      ]);
    },
  });

export const ENGINE_VOQUE_PROGRAM_RELATIONSHIP_GEPP =
  'engine-voque-program-relationship';

export type EngineVoqueProgramRelationshipGepp =
  typeof ENGINE_VOQUE_PROGRAM_RELATIONSHIP_GEPP;

export type EngineVoqueProgramRelationshipVoque = InMemoryOdeshin2Voque<
  EngineVoqueProgramRelationshipGepp,
  EngineVoqueProgramRelationship
>;
