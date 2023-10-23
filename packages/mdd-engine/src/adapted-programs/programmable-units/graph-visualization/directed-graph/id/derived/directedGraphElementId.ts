import { DirectedClusterId } from '../directedClusterId';
import { DirectedEdgeId } from '../directedEdgeId';
import { DirectedGraphNodeId } from '../directedGraphNodeId';
import { DirectedSubgraphId } from '../directedSubgraphId';
import { DirectedGraphId } from '../directedGraphId';

export type DirectedGraphElementId =
  | DirectedGraphId
  | DirectedSubgraphId
  | DirectedClusterId
  | DirectedGraphNodeId
  | DirectedEdgeId;

export type GraphConstituentId = Exclude<
  DirectedGraphElementId,
  DirectedGraphId
>;
