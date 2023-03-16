import { PartialAttributeByKey } from './attribute';

export type DirectedGraphEdge = {
  attributeByKey: PartialAttributeByKey;
  tailId: string;
  headId: string;
};
