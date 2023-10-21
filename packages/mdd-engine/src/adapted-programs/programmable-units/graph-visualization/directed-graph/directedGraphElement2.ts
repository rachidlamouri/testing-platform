import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
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

type DirectedGraphElement2CollectionId =
  typeof DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID;

export type DirectedGraphElement2StreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    DirectedGraphElement2CollectionId,
    DirectedGraphElement2
  >;
