import { DirectedGraph } from './directedGraph';
import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraphNode } from './directedGraphNode';
import { DirectedCluster, DirectedSubgraph } from './directedSubgraph';

/**
 * Any directed graph element that can be serialized to Graphviz code
 */
export type DirectedGraphElement =
  | DirectedGraph
  | DirectedSubgraph
  | DirectedCluster
  | DirectedGraphNode
  | DirectedGraphEdge;
