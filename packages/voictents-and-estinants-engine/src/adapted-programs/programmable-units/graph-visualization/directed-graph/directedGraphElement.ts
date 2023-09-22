import { DirectedGraph } from './directedGraph';
import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraphNode } from './directedGraphNode';
import { DirectedCluster, DirectedSubgraph } from './directedSubgraph';

export type DirectedGraphElement =
  | DirectedGraph
  | DirectedSubgraph
  | DirectedCluster
  | DirectedGraphNode
  | DirectedGraphEdge;
