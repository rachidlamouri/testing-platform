import { PartialClusterAttributeByKey } from './directedSubgraph';
import { RootGraphLocator } from './rootGraphLocator';

export type DirectedCluster2 = {
  zorn: string;
  isRoot: false;
  isCluster: true;
  attributeByKey: PartialClusterAttributeByKey;
  rankGroupList?: never;
  rootGraphLocator: RootGraphLocator;
  parentId: string;
  debugName: string;
};
