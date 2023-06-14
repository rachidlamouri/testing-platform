import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../utilities/getZorn';
import { RootGraphLocator } from '../graph-visualization/directed-graph/rootGraphLocator';

export type BaseProgramRelationship = {
  rootGraphLocator: RootGraphLocator;
  relatedZorn: string;
  parentId?: string;
};

export type ProgramRelationshipPrototype = {
  get zorn(): string;
};

/**
 * Enables joining an instance of a program model concept to a root graph
 */
export type ProgramRelationship = ObjectWithPrototype<
  BaseProgramRelationship,
  ProgramRelationshipPrototype
>;

export const { ProgramRelationshipInstance } = buildConstructorFunctionWithName(
  'ProgramRelationshipInstance',
)<BaseProgramRelationship, ProgramRelationshipPrototype>({
  zorn: (relationship) => {
    return getZorn([
      relationship.rootGraphLocator.debugName,
      relationship.relatedZorn,
    ]);
  },
});

export const PROGRAM_RELATIONSHIP_GEPP = 'program-relationship';

export type ProgramRelationshipGepp = typeof PROGRAM_RELATIONSHIP_GEPP;

export type ProgramRelationshipVoque = InMemoryOdeshin2Voque<
  ProgramRelationshipGepp,
  ProgramRelationship
>;
