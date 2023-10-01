import { AttributeByKeyGSCNE } from './attributeByKeyGSCNE';
import { SpreadN } from '../../../../package-agnostic-utilities/type/spreadN';
import { AttributeByKeyCNE } from './attributeByKeyCNE';

export enum EdgeStyle {
  Invisible = 'invis',
}

type EdgeAttributeByKey = SpreadN<
  [
    AttributeByKeyGSCNE,
    AttributeByKeyCNE,
    {
      style: EdgeStyle;
      arrowsize: number;
    },
  ]
>;

export type PartialEdgeAttributeByKey = Partial<EdgeAttributeByKey>;

/**
 * A representation of a Graphviz edge that can be serialized to graphviz code.
 */
export type DirectedGraphEdge = {
  attributeByKey?: PartialEdgeAttributeByKey;
  tailId: string;
  headId: string;
};
