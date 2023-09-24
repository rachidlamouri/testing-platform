import { SpreadN } from '../../../../utilities/types/spreadN';
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

export type DirectedSubgraph = {
  zorn: string;
  isRoot: false;
  isCluster: false;
  attributeByKey: PartialSubgraphAttributeByKey;
  rankGroupList?: string[][];
  nodeList: DirectedGraphNode[];
  edgeList: DirectedGraphEdge[];
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  subgraphList: SubgraphLike[];
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
  zorn: string;
  isRoot: false;
  isCluster: true;
  attributeByKey: PartialClusterAttributeByKey;
  rankGroupList?: never;
  nodeList: DirectedGraphNode[];
  edgeList: DirectedGraphEdge[];
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  subgraphList: SubgraphLike[];
};

export type SubgraphLike = DirectedSubgraph | DirectedCluster;