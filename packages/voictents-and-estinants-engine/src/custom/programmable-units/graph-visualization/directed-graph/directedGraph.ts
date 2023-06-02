import { Merge, SetOptional } from 'type-fest';
import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraphNode } from './directedGraphNode';
import { AttributeByKey as BaseAttributeByKey } from './attribute';
import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';

export enum DirectedGraphRankDirection {
  LeftRight = 'LR',
  RightLeft = 'RL',
  TopBottom = 'TB',
}

export enum DirectedGraphStyle {
  Bold = 'bold',
  Rounded = 'rounded',
}

export enum SubgraphRankType {
  Same = 'same',
  Minimum = 'min',
  Source = 'source',
  Maximum = 'max',
  Sink = 'sink',
}

type GraphSpecificAttributeByKey = {
  id: string;
  rankdir: DirectedGraphRankDirection;
  nodesep: number;
};

type GraphAttributeByKey = Merge<
  BaseAttributeByKey,
  GraphSpecificAttributeByKey
>;

type PartialGraphAttributeByKey = Partial<GraphAttributeByKey>;

type SubgraphSpecificAttributeByKey = {
  style: DirectedGraphStyle;
  rank: SubgraphRankType;
};

type SubgraphAttributeByKey = Merge<
  BaseAttributeByKey,
  SubgraphSpecificAttributeByKey
>;

type PartialSubgraphAttributeByKey = SetOptional<
  SubgraphAttributeByKey,
  Exclude<keyof SubgraphAttributeByKey, 'id'>
>;

export type DirectedSubgraph = {
  isRoot: false;
  isCluster: boolean;
  attributeByKey: PartialSubgraphAttributeByKey;
  rankGroupList?: string[][];
  nodeList: DirectedGraphNode[];
  edgeList: DirectedGraphEdge[];
  subgraphList: DirectedSubgraph[];
};

/**
 * A proprietary object that can be converted into Graphviz code
 */
export type DirectedGraph = {
  zorn: string;
  isRoot: true;
  isCluster?: never;
  attributeByKey: PartialGraphAttributeByKey;
  rankGroupList?: never;
  nodeList: DirectedGraphNode[];
  edgeList: DirectedGraphEdge[];
  subgraphList: DirectedSubgraph[];
};

export const DIRECTED_GRAPH_GEPP = 'directed-graph';

type DirectedGraphGepp = typeof DIRECTED_GRAPH_GEPP;

export type DirectedGraphVoque = InMemoryOdeshin2Voque<
  DirectedGraphGepp,
  DirectedGraph
>;
