import { AttributeByKeyGSCNE } from './attributeByKeyGSCNE';
import { SpreadN } from '../../../../utilities/types/spreadN';
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

export type DirectedGraphEdge = {
  attributeByKey?: PartialEdgeAttributeByKey;
  tailId: string;
  headId: string;
};
