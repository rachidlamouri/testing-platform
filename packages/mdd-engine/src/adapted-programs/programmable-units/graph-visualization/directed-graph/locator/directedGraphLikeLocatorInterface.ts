import { DirectedGraphLikeId } from '../id/derived/directedGraphLikeId';
import { GlobalDirectedClusterId } from '../id/derived/global/globalDirectedClusterId';
import { GlobalDirectedGraphId } from '../id/derived/global/globalDirectedGraph';
import { GlobalDirectedSubgraphId } from '../id/derived/global/globalDirectedSubgraph';
import { DirectedClusterId } from '../id/directedClusterId';
import { DirectedGraphId } from '../id/directedGraphId';
import { DirectedSubgraphId } from '../id/directedSubgraphId';
import { DirectedGraphElementLocator } from './directedGraphElementLocator';

export type DirectedGraphLocatorInterface = DirectedGraphElementLocator<
  DirectedGraphId,
  DirectedGraphId,
  GlobalDirectedGraphId
>;

export type DirectedSubgraphLocatorInterface = DirectedGraphElementLocator<
  DirectedSubgraphId,
  DirectedGraphLikeId,
  GlobalDirectedSubgraphId
>;

export type DirectedClusterLocatorInterface = DirectedGraphElementLocator<
  DirectedClusterId,
  DirectedGraphLikeId,
  GlobalDirectedClusterId
>;

export type DirectedGraphLikeLocatorInterface =
  | DirectedGraphLocatorInterface
  | DirectedSubgraphLocatorInterface
  | DirectedClusterLocatorInterface;
