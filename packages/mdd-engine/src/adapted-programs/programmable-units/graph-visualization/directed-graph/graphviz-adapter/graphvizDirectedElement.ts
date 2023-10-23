import { GraphvizDirectedCluster } from './graphvizDirectedCluster';
import { GraphvizDirectedEdge } from './graphvizDirectedEdge';
import { GraphvizDirectedGraph } from './graphvizDirectedGraph';
import { GraphvizDirectedGraphNode } from './graphvizDirectedGraphNode';
import { GraphvizDirectedSubgraph } from './graphvizDirectedSubgraph';

export type GraphvizDirectedGraphElement =
  | GraphvizDirectedGraph
  | GraphvizDirectedCluster
  | GraphvizDirectedSubgraph
  | GraphvizDirectedGraphNode
  | GraphvizDirectedEdge;
