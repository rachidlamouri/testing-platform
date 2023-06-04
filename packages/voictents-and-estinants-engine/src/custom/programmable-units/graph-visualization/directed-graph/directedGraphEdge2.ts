import { PartialEdgeAttributeByKey } from './directedGraphEdge';
import { RootGraphLocator } from './rootGraphLocator';

export type DirectedGraphEdge2 = {
  attributeByKey?: PartialEdgeAttributeByKey;
  tailId: string;
  headId: string;
  rootGraphLocator: RootGraphLocator;
};
