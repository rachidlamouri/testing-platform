import { GlobalDirectedClusterId } from './globalDirectedClusterId';
import { GlobalDirectedEdgeId } from './globalDirectedEdge';
import { GlobalDirectedGraphId } from './globalDirectedGraph';
import { GlobalDirectedGraphNodeId } from './globalDirectedGraphNode';
import { GlobalDirectedSubgraphId } from './globalDirectedSubgraph';

export type GlobalDirectedGraphElementId =
  | GlobalDirectedGraphId
  | GlobalDirectedSubgraphId
  | GlobalDirectedClusterId
  | GlobalDirectedGraphNodeId
  | GlobalDirectedEdgeId;
