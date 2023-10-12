import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraphNode } from './directedGraphNode';
import { InMemoryOdeshin2ListVoque } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { SpreadN } from '../../../../package-agnostic-utilities/type/spreadN';
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
 * A representation of a complete Graphviz directed graph including all of its
 * child objects. It can be serialized into Graphviz code.
 *
 * @todo rename this type and (all similar types: DirectedSubgraph, ...etc) since its too similar to DirectedGraph2 and
 * technically this object gets generated from DirectedGraph2
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
