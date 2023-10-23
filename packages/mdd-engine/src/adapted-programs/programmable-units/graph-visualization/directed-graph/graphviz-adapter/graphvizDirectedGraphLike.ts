import {
  PartialClusterAttributeByKey,
  PartialSubgraphAttributeByKey,
} from '../directedSubgraph';
import { getAttributeStatementList, quote } from './codeUtilities';
import { PartialGraphLikeAttributeByKey } from './element-attribute-by-key/derived/partialGraphLikeAttributeByKey';
import { GraphvizDirectedEdge } from './graphvizDirectedEdge';
import { GraphvizDirectedGraphNode } from './graphvizDirectedGraphNode';

export type GraphvizDirectedGraphLikeInput<
  TAttributeByKey extends PartialGraphLikeAttributeByKey,
> = {
  isRoot: boolean;
  isCluster: boolean | null;
  rankGroupList: string[][] | null;
  attributeByKey: TAttributeByKey;
  nodeList: GraphvizDirectedGraphNode[];
  edgeList: GraphvizDirectedEdge[];
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  subgraphList: GraphvizDirectedGraphLike<
    PartialSubgraphAttributeByKey | PartialClusterAttributeByKey
  >[];
};

/**
 * Base class for encodable Graphviz graph-like objects (graph, subgraph, and
 * cluster)
 */
export abstract class GraphvizDirectedGraphLike<
  TAttributeByKey extends PartialGraphLikeAttributeByKey,
> implements GraphvizDirectedGraphLikeInput<TAttributeByKey>
{
  isRoot: boolean;

  isCluster: boolean | null;

  rankGroupList: string[][] | null;

  attributeByKey: TAttributeByKey;

  nodeList: GraphvizDirectedGraphNode[];

  edgeList: GraphvizDirectedEdge[];

  subgraphList: GraphvizDirectedGraphLike<
    PartialSubgraphAttributeByKey | PartialClusterAttributeByKey
  >[];

  constructor(input: GraphvizDirectedGraphLikeInput<TAttributeByKey>) {
    this.isRoot = input.isRoot;
    this.isCluster = input.isCluster;
    this.rankGroupList = input.rankGroupList;
    this.attributeByKey = input.attributeByKey;
    this.nodeList = input.nodeList;
    this.edgeList = input.edgeList;
    this.subgraphList = input.subgraphList;
  }

  getCode(): string {
    const graphKeyword = this.isRoot ? 'digraph' : 'subgraph';

    // TODO: use cluster=true attribute instead https://graphviz.org/docs/attrs/cluster/
    const idPrefix = this.isCluster ? 'cluster_' : '';
    const idSuffix = this.isRoot ? '' : this.attributeByKey.id;
    const id = `${idPrefix}${idSuffix}`;

    const quotedId = quote(id);

    const indent = '  ' as const;

    const attributeStatementList = getAttributeStatementList(
      this.attributeByKey,
    ).map((line) => {
      return `${indent}${line}`;
    });

    const serializedRankGroupList = (this.rankGroupList ?? []).map((group) => {
      const nodeIdList = group.map((nodeId) => `"${nodeId}"`);

      return `${indent}{ rank=same; ${nodeIdList.join('; ')}; }`;
    });

    const nodeStatementList = this.nodeList.map((node) => {
      return `${indent}${node.getCode()}`;
    });

    const edgeStatementList = this.edgeList.map((edge) => {
      return `${indent}${edge.getCode()}`;
    });

    const subgraphLineList = this.subgraphList
      .map((subgraph) => {
        return subgraph.getCode();
      })
      .flat()
      .map((line) => `${indent}${line}`);

    const lineList = [
      `${graphKeyword} ${quotedId} {`,
      ...attributeStatementList,
      '',
      ...nodeStatementList,
      '',
      ...edgeStatementList,
      '',
      ...subgraphLineList,
      '',
      ...serializedRankGroupList,
      '',
      '}',
    ];

    const code = lineList.join('\n');
    return code;
  }
}
