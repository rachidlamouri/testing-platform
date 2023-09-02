import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../../utilities/getZorn';
import { getZornableId } from '../../../../utilities/getZornableId';
import {
  GraphConstituentLocator,
  GraphConstituentLocatorInstance,
} from '../../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { RootGraphLocator } from '../../../programmable-units/graph-visualization/directed-graph/rootGraphLocator';
import { LocalDirectedGraphElement2Zorn } from '../../../programmable-units/graph-visualization/directed-graph/types';
import { BoundaryFact } from '../boundary/boundaryFact';

type BaseAssociatedBoundaryFact = {
  referencingBoundaryFact: BoundaryFact;
  referencedBoundaryFact: BoundaryFact;
};

type AssociatedBoundaryFactPrototype = {
  get zorn(): string;
  get subgraphLocator(): GraphConstituentLocator;
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
    subgraphLocator: (associatedBoundaryFact) => {
      const distinguisher = getZorn([associatedBoundaryFact.zorn, 'subgraph']);
      return new GraphConstituentLocatorInstance({
        idOverride: getZornableId({
          zorn: distinguisher,
        }),
        rootGraphLocator: associatedBoundaryFact.rootGraphLocator,
        parentId: associatedBoundaryFact.rootGraphLocator.id,
        localZorn: LocalDirectedGraphElement2Zorn.buildSubgraphZorn({
          distinguisher,
        }),
      });
    },
    rootGraphLocator: (boundaryAssociation) => {
      return boundaryAssociation.referencingBoundaryFact.rootGraphLocator;
    },
  });

export const ASSOCIATED_BOUNDARY_FACT_GEPP = 'associated-boundary-fact';

type AssociatedBoundaryFactGepp = typeof ASSOCIATED_BOUNDARY_FACT_GEPP;

export type AssociatedBoundaryFactVoque = InMemoryOdeshin2ListVoque<
  AssociatedBoundaryFactGepp,
  AssociatedBoundaryFact
>;
