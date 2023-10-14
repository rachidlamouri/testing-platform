import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { DirectedCluster2 } from './directedCluster2';
import { DirectedGraph2 } from './directedGraph2';
import { DirectedGraphEdge2 } from './directedGraphEdge2';
import { DirectedGraphNode2 } from './directedGraphNode2';
import { DirectedSubgraph2 } from './directedSubgraph2';

/**
 * A graph, subgraph, cluster, node, or edge
 */
export type DirectedGraphElement2 =
  | DirectedGraph2
  | DirectedSubgraph2
  | DirectedCluster2
  | DirectedGraphNode2
  | DirectedGraphEdge2;

export const DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID =
  'directed-graph-element-2';

type DirectedGraphElement2Gepp = typeof DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID;

export type DirectedGraphElement2StreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    DirectedGraphElement2Gepp,
    DirectedGraphElement2
  >;
