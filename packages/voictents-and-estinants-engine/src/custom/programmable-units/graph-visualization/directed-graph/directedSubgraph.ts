import { SpreadN } from '../../../../utilities/spreadN';
import { AttributeByKeyCNE } from './attributeByKeyCNE';
import { AttributeByKeyGS } from './attributeByKeyGS';
import { AttributeByKeyGSC } from './attributeByKeyGSC';
import { AttributeByKeyGSCNE } from './attributeByKeyGSCNE';
import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraphNode } from './directedGraphNode';
import { PartialAttributeByKey } from './partialAttributeByKey';

export enum RankType {
  Same = 'same',
  Minimum = 'min',
  Source = 'source',
  Maximum = 'max',
  Sink = 'sink',
}

type SubgraphAttributeByKey = SpreadN<
  [
    AttributeByKeyGSCNE,
    AttributeByKeyGS,
    AttributeByKeyGSC,
    {
      rank: RankType;
    },
  ]
>;

export type PartialSubgraphAttributeByKey =
  PartialAttributeByKey<SubgraphAttributeByKey>;

// TODO: add a debug label, since not all subgraphs and clusters will have a label
export type DirectedSubgraph = {
  isRoot: false;
  isCluster: false;
  attributeByKey: PartialSubgraphAttributeByKey;
  rankGroupList?: string[][];
  nodeList: DirectedGraphNode[];
  edgeList: DirectedGraphEdge[];
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  subgraphList: SubgraphLike[];
  debugName?: string;
};

type ClusterAttributeByKey = SpreadN<
  [
    AttributeByKeyGSCNE,
    AttributeByKeyCNE,
    AttributeByKeyGSC,
    {
      color: string;
    },
  ]
>;

export type PartialClusterAttributeByKey =
  PartialAttributeByKey<ClusterAttributeByKey>;

export type DirectedCluster = {
  isRoot: false;
  isCluster: true;
  attributeByKey: PartialClusterAttributeByKey;
  rankGroupList?: never;
  nodeList: DirectedGraphNode[];
  edgeList: DirectedGraphEdge[];
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  subgraphList: SubgraphLike[];
  debugName?: string;
};

export type SubgraphLike = DirectedSubgraph | DirectedCluster;
