import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import { RootGraphLocator } from '../../../programmable-units/graph-visualization/directed-graph/rootGraphLocator';
import { BoundaryFact } from '../boundary/boundaryFact';

type BaseAssociatedBoundaryFact = {
  referencingBoundaryFact: BoundaryFact;
  referencedBoundaryFact: BoundaryFact;
};

type AssociatedBoundaryFactPrototype = {
  get zorn(): string;
  get subgraphZorn(): string;
  get subgraphId(): string;
  get rootGraphLocator(): RootGraphLocator;
};

/**
 * Information representing a boundary referenced by another boundary
 */
type AssociatedBoundaryFact = ObjectWithPrototype<
  BaseAssociatedBoundaryFact,
  AssociatedBoundaryFactPrototype
>;

export const { AssociatedBoundaryFactInstance } =
  buildConstructorFunctionWithName('AssociatedBoundaryFactInstance')<
    BaseAssociatedBoundaryFact,
    AssociatedBoundaryFactPrototype,
    AssociatedBoundaryFact
  >({
    zorn: (associatedBoundaryFact) => {
      return getZorn([
        associatedBoundaryFact.referencingBoundaryFact.zorn,
        'references',
        associatedBoundaryFact.referencedBoundaryFact.zorn,
      ]);
    },
    subgraphZorn: (associatedBoundaryFact) => {
      return getZorn([associatedBoundaryFact.zorn, 'subgraph']);
    },
    subgraphId: (associatedBoundaryFact) => {
      return getZornableId({ zorn: associatedBoundaryFact.subgraphZorn });
    },
    rootGraphLocator: (boundaryAssociation) => {
      return boundaryAssociation.referencingBoundaryFact.rootGraphLocator;
    },
  });

export const ASSOCIATED_BOUNDARY_FACT_GEPP = 'associated-boundary-fact';

type AssociatedBoundaryFactGepp = typeof ASSOCIATED_BOUNDARY_FACT_GEPP;

export type AssociatedBoundaryFactVoque = InMemoryOdeshin2Voque<
  AssociatedBoundaryFactGepp,
  AssociatedBoundaryFact
>;
