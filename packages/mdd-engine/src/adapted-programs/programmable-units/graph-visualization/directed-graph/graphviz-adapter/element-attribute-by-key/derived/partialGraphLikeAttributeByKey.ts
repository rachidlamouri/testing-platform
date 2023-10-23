import { PartialGraphAttributeByKey } from '../partialGraphAttributeByKey';
import { PartialSubgraphLikeAttributeByKey } from './partialSubgraphLikeAttributeByKey';

// TODO: move this definition to element-attributes/
export type PartialGraphLikeAttributeByKey =
  | PartialGraphAttributeByKey
  | PartialSubgraphLikeAttributeByKey;
