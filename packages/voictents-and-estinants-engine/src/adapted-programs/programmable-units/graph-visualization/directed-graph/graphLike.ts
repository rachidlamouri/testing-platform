import { DirectedGraph } from './directedGraph';
import { DirectedSubgraph, DirectedCluster } from './directedSubgraph';

/**
 * A DirectedGraph, DirectedSubgraph, or DirectedCluster
 */
export type GraphLike = DirectedGraph | DirectedSubgraph | DirectedCluster;
