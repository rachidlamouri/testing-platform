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

type GraphSpecificAttributeByKey = {
  id: string;
  rankdir: DirectedGraphRankDirection;
};

type GraphAttributeByKey = Merge<
  BaseAttributeByKey,
  GraphSpecificAttributeByKey
>;

export type PartialGraphAttributeByKey = Partial<GraphAttributeByKey>;

type SubgraphAttributeByKey = BaseAttributeByKey;

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
