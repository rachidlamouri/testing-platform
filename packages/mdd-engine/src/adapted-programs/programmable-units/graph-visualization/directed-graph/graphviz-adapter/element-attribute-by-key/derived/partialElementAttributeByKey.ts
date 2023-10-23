import { PartialEdgeAttributeByKey } from '../partialEdgeAttributeByKey';
import { PartialNodeAttributeByKey } from '../partialNodeAttributeByKey';
import { PartialGraphLikeAttributeByKey } from './partialGraphLikeAttributeByKey';

export type PartialElementAttributeByKey =
  | PartialGraphLikeAttributeByKey
  | PartialNodeAttributeByKey
  | PartialEdgeAttributeByKey;
