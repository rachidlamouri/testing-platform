import { PartialSubgraphAttributeByKey } from './directedSubgraph';
import { RootGraphLocator } from './rootGraphLocator';

export type DirectedSubgraph2 = {
  isRoot: false;
  isCluster: false;
  attributeByKey: PartialSubgraphAttributeByKey;
  rankGroupList?: string[][];
  rootGraphLocator: RootGraphLocator;
  parentId: string;
};
