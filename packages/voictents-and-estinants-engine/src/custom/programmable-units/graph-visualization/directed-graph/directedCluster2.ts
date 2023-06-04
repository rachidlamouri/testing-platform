import { PartialClusterAttributeByKey } from './directedSubgraph';
import { RootGraphLocator } from './rootGraphLocator';

export type DirectedCluster2 = {
  isRoot: false;
  isCluster: true;
  attributeByKey: PartialClusterAttributeByKey;
  rankGroupList?: never;
  rootGraphLocator: RootGraphLocator;
  parentId: string;
};
