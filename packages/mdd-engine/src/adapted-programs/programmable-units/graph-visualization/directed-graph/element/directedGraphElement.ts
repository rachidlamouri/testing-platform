import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { DirectedCluster } from './directedCluster';
import { DirectedEdge } from './directedEdge';
import { DirectedGraph } from './directedGraph';
import { DirectedGraphNode } from './directedGraphNode';
import { DirectedSubgraph } from './directedSubgraph';

/**
 * A custom directed graph object. These should be constructed individually and
 * assembled later. They can be turned into graphviz objects.
 */
export type DirectedGraphElement =
  | DirectedGraph
  | DirectedSubgraph
  | DirectedCluster
  | DirectedGraphNode
  | DirectedEdge;

export type DirectedGraphConstituent = Exclude<
  DirectedGraphElement,
  DirectedGraph
>;

export const DIRECTED_GRAPH_ELEMENT_COLLECTION_ID = 'directed-graph-element';

type DirectedGraphElementCollectionId =
  typeof DIRECTED_GRAPH_ELEMENT_COLLECTION_ID;

export type DirectedGraphElementStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    DirectedGraphElementCollectionId,
    DirectedGraphElement
  >;
