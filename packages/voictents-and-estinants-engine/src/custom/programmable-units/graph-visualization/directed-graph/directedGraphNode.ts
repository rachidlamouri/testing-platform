import { AttributeByKeyGSCNE } from './attributeByKeyGSCNE';
import { PartialAttributeByKey } from './partialAttributeByKey';
import { SpreadN } from '../../../../utilities/spreadN';
import { AttributeByKeyCNE } from './attributeByKeyCNE';

enum NodeLabelLocation {
  Top = 't',
  Bottom = 'b',
  Center = 'c',
}

export enum NodeShape {
  Box = 'box',
  Circle = 'circle',
  InvertedTriangle = 'invtriangle',
  InvertedHouse = 'invhouse',
  Oval = 'oval',
  PlainText = 'plaintext',
  Point = 'point',
}

type NodeAttributeByKey = SpreadN<
  [
    AttributeByKeyGSCNE,
    AttributeByKeyCNE,
    {
      shape: NodeShape;
      labelloc: NodeLabelLocation;
    },
  ]
>;

type PartialNodeAttributeByKey = PartialAttributeByKey<NodeAttributeByKey>;

export type DirectedGraphNode = {
  attributeByKey: PartialNodeAttributeByKey;
};
