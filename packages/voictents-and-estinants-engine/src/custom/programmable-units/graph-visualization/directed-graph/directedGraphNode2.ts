import { PartialNodeAttributeByKey } from './directedGraphNode';
import { RootGraphLocator } from './rootGraphLocator';

export type DirectedGraphNode2 = {
  zorn: string;
  attributeByKey: PartialNodeAttributeByKey;
  rootGraphLocator: RootGraphLocator;
  parentId: string;
};
