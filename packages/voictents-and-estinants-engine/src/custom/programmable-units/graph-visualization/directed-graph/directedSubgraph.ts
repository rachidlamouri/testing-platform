import { SpreadN } from '../../../../utilities/spreadN';
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

      // TODO: remove this when cluster is split from subgraph
      color: string;
    },
  ]
>;

type PartialSubgraphAttributeByKey =
  PartialAttributeByKey<SubgraphAttributeByKey>;

export type DirectedSubgraph = {
  isRoot: false;
  isCluster: boolean;
  attributeByKey: PartialSubgraphAttributeByKey;
  rankGroupList?: string[][];
  nodeList: DirectedGraphNode[];
  edgeList: DirectedGraphEdge[];
  subgraphList: DirectedSubgraph[];
};
