import { PartialNodeAttributeByKey } from './directedGraphNode';
import { RootGraphLocator } from './rootGraphLocator';

export type DirectedGraphNode2 = {
  attributeByKey: PartialNodeAttributeByKey;
  rootGraphLocator: RootGraphLocator;
  parentId: string;
};
