import { RankDirection } from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGS';
import { GraphLikeStyle } from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGSC';
import { PartialGraphAttributeByKey } from '../../programmable-units/graph-visualization/directed-graph/directedGraph';
import {
  NodeShape,
  NodeStyle,
  PartialNodeAttributeByKey,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { PartialClusterAttributeByKey } from '../../programmable-units/graph-visualization/directed-graph/directedSubgraph';

const fontname = 'Helvetica';
const penwidth = 0.2;

export const THEME = {
  graph: {
    fontname,
    rankdir: RankDirection.LeftRight,
  } satisfies Omit<PartialGraphAttributeByKey, 'id'>,
  boundary: {
    fontsize: 24,
    style: GraphLikeStyle.Rounded,
    penwidth,
  } satisfies Omit<PartialClusterAttributeByKey, 'id'>,
  placeholder: {
    fontname,
    fontsize: 12,
    shape: NodeShape.Box,
    style: NodeStyle.Rounded,
    penwidth,
  } satisfies Omit<PartialNodeAttributeByKey, 'id'>,
} as const;
