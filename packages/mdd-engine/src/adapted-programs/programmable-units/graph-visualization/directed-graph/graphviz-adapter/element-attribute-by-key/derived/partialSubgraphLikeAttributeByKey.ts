import { PartialClusterAttributeByKey } from '../partialClusterAttributeByKey';
import { PartialSubgraphAttributeByKey } from '../partialSubgraphAttributeByKey';

export type PartialSubgraphLikeAttributeByKey =
  | PartialSubgraphAttributeByKey
  | PartialClusterAttributeByKey;
