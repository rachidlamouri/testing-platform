import { Merge, SetOptional } from 'type-fest';
import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraphNode } from './directedGraphNode';
import { AttributeByKey as BaseAttributeByKey } from './attribute';

export enum DirectedGraphRankDirection {
  LeftRight = 'LR',
  RightLeft = 'RL',
  TopBottom = 'TB',
}

export enum DirectedGraphStyle {
  Bold = 'bold',
  Rounded = 'rounded',
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

export type PartialGraphAttributeByKey = Partial<GraphAttributeByKey>;

type SubgraphSpecificAttributeByKey = {
  style: DirectedGraphStyle;
};

type SubgraphAttributeByKey = Merge<
  BaseAttributeByKey,
  SubgraphSpecificAttributeByKey
>;

export type PartialSubgraphAttributeByKey = SetOptional<
  SubgraphAttributeByKey,
  Exclude<keyof SubgraphAttributeByKey, 'id'>
>;

export type DirectedSubgraph = {
  isRoot: false;
  attributeByKey: PartialSubgraphAttributeByKey;
  nodeList: DirectedGraphNode[];
  edgeList: DirectedGraphEdge[];
  subgraphList: DirectedSubgraph[];
};

export type DirectedGraph = {
  isRoot: true;
  attributeByKey: PartialGraphAttributeByKey;
  nodeList: DirectedGraphNode[];
  edgeList: DirectedGraphEdge[];
  subgraphList: DirectedSubgraph[];
};

export type DirectedGraphGrition = Grition<DirectedGraph>;

export type DirectedGraphOdeshin = OdeshinFromGrition<DirectedGraphGrition>;

export const DIRECTED_GRAPH_GEPP = 'directed-graph';

export type DirectedGraphGepp = typeof DIRECTED_GRAPH_GEPP;

export type DirectedGraphVoictent = Voictent<
  DirectedGraphGepp,
  DirectedGraphOdeshin
>;
