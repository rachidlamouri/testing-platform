import { PartialEdgeAttributeByKey } from '../partialEdgeAttributeByKey';
import { PartialNodeAttributeByKey } from '../partialNodeAttributeByKey';
import { PartialGraphLikeAttributeByKey } from './partialGraphLikeAttributeByKey';

/**
 * All graphviz attributes
 */
export type PartialElementAttributeByKey =
  | PartialGraphLikeAttributeByKey
  | PartialNodeAttributeByKey
  | PartialEdgeAttributeByKey;
