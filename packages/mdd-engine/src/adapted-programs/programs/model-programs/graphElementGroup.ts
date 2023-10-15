import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
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
  get id(): string;
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
  id: (group) => {
    return group.rootGraphLocator.id.forHuman;
  },
});

export const GRAPH_ELEMENT_GROUP_COLLECTION_ID = 'graph-element-group';

type GraphElementGroupCollectionId = typeof GRAPH_ELEMENT_GROUP_COLLECTION_ID;

export type GraphElementGroupStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    GraphElementGroupCollectionId,
    GraphElementGroup
  >;
