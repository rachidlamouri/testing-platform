import { DirectedClusterLocator } from './directedClusterLocator';
import { DirectedGraphLocator } from './directedGraphLocator';
import { DirectedSubgraphLocator } from './directedSubgraphLocator';

export type DirectedGraphLikeLocator =
  | DirectedGraphLocator
  | DirectedSubgraphLocator
  | DirectedClusterLocator;
