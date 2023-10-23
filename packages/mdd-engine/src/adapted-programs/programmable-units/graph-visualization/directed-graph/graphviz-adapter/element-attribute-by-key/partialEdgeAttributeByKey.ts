import { SpreadN } from '../../../../../../package-agnostic-utilities/type/spreadN';
import { AttributeByKeyCNE } from '../../attributeByKeyCNE';
import { AttributeByKeyGSCNE } from '../../attributeByKeyGSCNE';

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

/**
 * Graphviz edge attributes
 */
export type PartialEdgeAttributeByKey = Partial<EdgeAttributeByKey>;
