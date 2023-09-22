import { RankDirection } from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGS';
import {
  GraphLikeLabelLocation,
  GraphLikeStyle,
} from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGSC';
import { PartialGraphAttributeByKey } from '../../programmable-units/graph-visualization/directed-graph/directedGraph';
import { PartialEdgeAttributeByKey } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge';
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
    fontsize: 36,
    rankdir: RankDirection.LeftRight,
    labelloc: GraphLikeLabelLocation.Top,
  } satisfies Omit<PartialGraphAttributeByKey, 'id'>,
  boundary: {
    fontsize: 24,
    style: GraphLikeStyle.Rounded,
    penwidth,
  } satisfies Omit<PartialClusterAttributeByKey, 'id'>,
  directorySubgraph: {
    fontsize: 16,
    style: GraphLikeStyle.Rounded,
    penwidth,
  },
  directoryPathNode: {
    shape: NodeShape.Circle,
    color: '#888888',
    fillcolor: '#aaaaaa',
    style: NodeStyle.Filled,
    width: 0.05,
    height: 0.05,
  } satisfies Omit<PartialNodeAttributeByKey, 'id'>,
  file: {
    fontname,
    fontsize: 12,
    shape: NodeShape.Box,
    style: NodeStyle.Rounded,
    penwidth,
  } satisfies Omit<PartialNodeAttributeByKey, 'id'>,
  dependencyEdge: {
    color: 'black',
    arrowsize: 0.5,
    penwidth: 0.5,
  } satisfies Omit<PartialEdgeAttributeByKey, 'id'>,
} as const;
