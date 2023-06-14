import { PartialGraphAttributeByKey } from './directedGraph';
import { RootGraphLocator } from './rootGraphLocator';

export type DirectedGraph2 = {
  zorn: string;
  isRoot: true;
  isCluster?: never;
  attributeByKey: PartialGraphAttributeByKey;
  rankGroupList?: never;
  rootGraphLocator: RootGraphLocator;
};
