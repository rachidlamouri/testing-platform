import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { DirectedGraphElement2 } from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { RootGraphLocator } from '../../programmable-units/graph-visualization/directed-graph/rootGraphLocator';

type BaseGraphElementGroup = {
  rootGraphLocator: RootGraphLocator;
  elementList: DirectedGraphElement2[];
};

type GraphElementGroupPrototype = {
  get zorn(): string;
};

/**
 * A collection of graph elements to be rendered in a single graph
 */
export type GraphElementGroup = ObjectWithPrototype<
  BaseGraphElementGroup,
  GraphElementGroupPrototype
>;

export const { GraphElementGroupInstance } = buildConstructorFunctionWithName(
  'GraphElementGroupInstance',
)<BaseGraphElementGroup, GraphElementGroupPrototype>({
  zorn: (group) => {
    return group.rootGraphLocator.zorn.forHuman;
  },
});

export const GRAPH_ELEMENT_GROUP_GEPP = 'graph-element-group';

type GraphElementGroupGepp = typeof GRAPH_ELEMENT_GROUP_GEPP;

export type GraphElementGroupVoque = InMemoryOdeshin2ListVoque<
  GraphElementGroupGepp,
  GraphElementGroup
>;
