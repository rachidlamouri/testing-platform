import { SetRequired } from 'type-fest';
import { PartialEdgeAttributeByKey } from './directedGraphEdge';
import { RootGraphLocator } from './rootGraphLocator';

export type DirectedGraphEdge2 = {
  zorn: string;
  // TODO: make attribute.id a computed property, and make attributeByKey optional
  attributeByKey: SetRequired<PartialEdgeAttributeByKey, 'id'>;
  tailId: string;
  headId: string;
  rootGraphLocator: RootGraphLocator;
};
