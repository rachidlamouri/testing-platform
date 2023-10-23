import { DirectedGraphLikeId } from '../id/derived/directedGraphLikeId';
import { GlobalDirectedClusterId } from '../id/derived/global/globalDirectedClusterId';
import { GlobalDirectedGraphId } from '../id/derived/global/globalDirectedGraphId';
import { GlobalDirectedSubgraphId } from '../id/derived/global/globalDirectedSubgraphId';
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

/**
 * Interfaces for all grpah-like locators, so that all graph-like locators can
 * reference all subgraph-like locators for nested subgraph lists
 */
export type DirectedGraphLikeLocatorInterface =
  | DirectedGraphLocatorInterface
  | DirectedSubgraphLocatorInterface
  | DirectedClusterLocatorInterface;
