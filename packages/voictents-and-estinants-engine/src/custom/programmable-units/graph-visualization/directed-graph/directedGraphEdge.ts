import { AttributeByKeyGSCNE } from './attributeByKeyGSCNE';
import { PartialAttributeByKey } from './partialAttributeByKey';
import { SpreadN } from '../../../../utilities/spreadN';
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
    },
  ]
>;

type PartialEdgeAttributeByKey = PartialAttributeByKey<EdgeAttributeByKey>;

export type DirectedGraphEdge = {
  attributeByKey: PartialEdgeAttributeByKey;
  tailId: string;
  headId: string;
};
