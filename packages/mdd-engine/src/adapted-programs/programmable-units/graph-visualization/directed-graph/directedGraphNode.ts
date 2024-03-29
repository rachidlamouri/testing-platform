import { AttributeByKeyGSCNE } from './attributeByKeyGSCNE';
import { PartialAttributeByKey } from './partialAttributeByKey';
import { SpreadN } from '../../../../package-agnostic-utilities/type/spreadN';
import { AttributeByKeyCNE } from './attributeByKeyCNE';

enum NodeLabelLocation {
  Top = 't',
  Bottom = 'b',
  Center = 'c',
}

enum NodeShape {
  Box = 'box',
  Circle = 'circle',
  Ellipse = 'ellipse',
  InvertedTriangle = 'invtriangle',
  InvertedHouse = 'invhouse',
  Oval = 'oval',
  PlainText = 'plaintext',
  Point = 'point',
}

enum NodeStyle {
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

export type PartialNodeAttributeByKey =
  PartialAttributeByKey<NodeAttributeByKey>;

/**
 * A representation of a Graphviz node that can be serialized to graphviz code.
 */
export type DirectedGraphNode = {
  attributeByKey: PartialNodeAttributeByKey;
};
