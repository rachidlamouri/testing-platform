import { SpreadN } from '../../../../../../package-agnostic-utilities/type/spreadN';
import { AttributeByKeyCNE } from '../../attributeByKeyCNE';
import { AttributeByKeyGSCNE } from '../../attributeByKeyGSCNE';
import { PartialAttributeByKey } from '../../partialAttributeByKey';

enum NodeLabelLocation {
  Top = 't',
  Bottom = 'b',
  Center = 'c',
}

export enum NodeShape {
  Box = 'box',
  Circle = 'circle',
  Ellipse = 'ellipse',
  InvertedTriangle = 'invtriangle',
  InvertedHouse = 'invhouse',
  Oval = 'oval',
  PlainText = 'plaintext',
  Point = 'point',
}

export enum NodeStyle {
  Rounded = 'rounded',
  Filled = 'filled',
}

type NodeAttributeByKey = SpreadN<
  [
    AttributeByKeyGSCNE,
    AttributeByKeyCNE,
    {
      shape: NodeShape;
      labelloc: NodeLabelLocation;
      style: NodeStyle;
      width: number;
      height: number;
      fixedsize: boolean;
    },
  ]
>;
/**
 * Graphviz node attributes
 */
export type PartialNodeAttributeByKey =
  PartialAttributeByKey<NodeAttributeByKey>;
