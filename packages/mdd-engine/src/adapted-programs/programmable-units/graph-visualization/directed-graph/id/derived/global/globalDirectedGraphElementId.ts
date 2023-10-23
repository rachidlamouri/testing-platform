import { GlobalDirectedClusterId } from './globalDirectedClusterId';
import { GlobalDirectedEdgeId } from './globalDirectedEdgeId';
import { GlobalDirectedGraphId } from './globalDirectedGraphId';
import { GlobalDirectedGraphNodeId } from './globalDirectedGraphNodeId';
import { GlobalDirectedSubgraphId } from './globalDirectedSubgraphId';

export type GlobalDirectedGraphElementId =
  | GlobalDirectedGraphId
  | GlobalDirectedSubgraphId
  | GlobalDirectedClusterId
  | GlobalDirectedGraphNodeId
  | GlobalDirectedEdgeId;
