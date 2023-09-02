import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraphNode } from './directedGraphNode';
import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { SpreadN } from '../../../../utilities/spreadN';
import { AttributeByKeyGSCNE } from './attributeByKeyGSCNE';
import { AttributeByKeyGSC } from './attributeByKeyGSC';
import { AttributeByKeyGS } from './attributeByKeyGS';
import { PartialAttributeByKey } from './partialAttributeByKey';
import { SubgraphLike } from './directedSubgraph';

type GraphAttributeByKey = SpreadN<
  [AttributeByKeyGSCNE, AttributeByKeyGSC, AttributeByKeyGS]
>;

export type PartialGraphAttributeByKey =
  PartialAttributeByKey<GraphAttributeByKey>;

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
  subgraphList: SubgraphLike[];
};

export const DIRECTED_GRAPH_GEPP = 'directed-graph';

type DirectedGraphGepp = typeof DIRECTED_GRAPH_GEPP;

export type DirectedGraphVoque = InMemoryOdeshin2ListVoque<
  DirectedGraphGepp,
  DirectedGraph
>;
