import { DirectedClusterLocator } from './directedClusterLocator';
import { DirectedGraphLocator } from './directedGraphLocator';
import { DirectedSubgraphLocator } from './directedSubgraphLocator';

/**
 * Union of all graph-like locators
 */
export type DirectedGraphLikeLocator =
  | DirectedGraphLocator
  | DirectedSubgraphLocator
  | DirectedClusterLocator;
