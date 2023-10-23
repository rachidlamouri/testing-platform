import { PartialClusterAttributeByKey } from '../partialClusterAttributeByKey';
import { PartialSubgraphAttributeByKey } from '../partialSubgraphAttributeByKey';

/**
 * All graphviz subgraph-like attributes
 */
export type PartialSubgraphLikeAttributeByKey =
  | PartialSubgraphAttributeByKey
  | PartialClusterAttributeByKey;
