import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../utilities/getZorn';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';
import { EngineEstinantLocator2 } from './engineEstinantLocator2';

export type BaseEngineEstinantProgramRelationship = {
  rootGraphLocator: RootGraphLocator;
  engineEstinantLocator: EngineEstinantLocator2;
};

export type EngineEstinantProgramRelationshipPrototype = {
  get zorn(): string;
};

/**
 * Contains the locators for an estinant and a graph that references that estinant
 */
export type EngineEstinantProgramRelationship = ObjectWithPrototype<
  BaseEngineEstinantProgramRelationship,
  EngineEstinantProgramRelationshipPrototype
>;

export const { EngineEstinantProgramRelationshipInstance } =
  buildConstructorFunctionWithName('EngineEstinantProgramRelationshipInstance')<
    BaseEngineEstinantProgramRelationship,
    EngineEstinantProgramRelationshipPrototype
  >({
    zorn: (relationship) => {
      return getZorn([
        relationship.rootGraphLocator.id,
        relationship.engineEstinantLocator.id,
      ]);
    },
  });

export const ENGINE_ESTINANT_PROGRAM_RELATIONSHIP_GEPP =
  'engine-estinant-program-relationship';

export type EngineEstinantProgramRelationshipGepp =
  typeof ENGINE_ESTINANT_PROGRAM_RELATIONSHIP_GEPP;

export type EngineEstinantProgramRelationshipVoque = InMemoryOdeshin2Voque<
  EngineEstinantProgramRelationshipGepp,
  EngineEstinantProgramRelationship
>;
