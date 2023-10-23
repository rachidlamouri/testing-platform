import { PartialGraphAttributeByKey } from '../partialGraphAttributeByKey';
import { PartialSubgraphLikeAttributeByKey } from './partialSubgraphLikeAttributeByKey';

/**
 * All graphviz graph-like attributes
 */
export type PartialGraphLikeAttributeByKey =
  | PartialGraphAttributeByKey
  | PartialSubgraphLikeAttributeByKey;
