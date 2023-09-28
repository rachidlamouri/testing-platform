import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraph } from './directedGraph';
import { DirectedGraphNode } from './directedGraphNode';
import { GraphLike } from './graphLike';
import { DirectedGraphElement } from './directedGraphElement';

const indent = '  ' as const;

type QuotedText = `"${string}"`;

type AttributeStatement = `${QuotedText}=${string};`;

// This should be a recursive template literal of "AttributeStatement", but that feature is not supported
type AttributeListStatement = `[ ${AttributeStatement} ]`;

const quote = (text: string): QuotedText => `"${text}"`;

// TODO: update graph ids to be uuids that are easy to map to other data
const escapeId = (text: string): string => text.replaceAll(/(\/|@|\.)/g, '__');
const quoteId = (text: string): QuotedText => quote(escapeId(text));

const getAttributeStatementList = (
  node: DirectedGraphElement,
): AttributeStatement[] => {
  if (node.attributeByKey === undefined) {
    return [];
  }

  return Object.entries(node.attributeByKey)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]): AttributeStatement => {
      const textValue = String(value);

      const quotedKey = quote(key);

      // let formattedValue: string;
      // if (key === 'id') {
      //   formattedValue = quoteId(textValue);
      // } else if (key === 'arrowsize') {
      //   formattedValue = textValue;
      // } else {
      //   formattedValue = quote(`${value}`);
      // }

      // return `${quotedKey}=${formattedValue};`;

      const quotedValue = key === 'id' ? quoteId(textValue) : quote(textValue);

      return `${quotedKey}=${quotedValue};`;
    });
};

const joinAttributeListSingleLine = (list: string[]): AttributeListStatement =>
  `[ ${list.join(' ')} ]` as AttributeListStatement;

type EdgeRelationshipStatement = `${QuotedText} -> ${QuotedText}`;

type EdgeStatement = `${EdgeRelationshipStatement} ${AttributeListStatement}`;

const getEdgeStatement = (edge: DirectedGraphEdge): EdgeStatement => {
  // TODO: remove "id" from DirectedGraphEdge
  const { id, ...otherAttributeByKey } = edge.attributeByKey ?? {};

  const modifiedEdge = {
    ...edge,
    attributeByKey: {
      id: `${edge.tailId}:${edge.headId}`,
      ...otherAttributeByKey,
    },
  };

  const attributeStatementList = getAttributeStatementList(modifiedEdge);

  const attributeListStatement = joinAttributeListSingleLine(
    attributeStatementList,
  );

  const quotedTailId = quoteId(modifiedEdge.tailId);
  const quotedHeadId = quoteId(modifiedEdge.headId);
  const edgeRelationshipStatement: EdgeRelationshipStatement = `${quotedTailId} -> ${quotedHeadId}`;

  const edgeStatement: EdgeStatement = `${edgeRelationshipStatement} ${attributeListStatement}`;
  return edgeStatement;
};

type NodeStatement = `${QuotedText} ${AttributeListStatement}`;

const getNodeStatement = (node: DirectedGraphNode): string => {
  const attributeStatementList = getAttributeStatementList(node);

  const attributeListStatement = joinAttributeListSingleLine(
    attributeStatementList,
  );

  const quotedId = quoteId(node.attributeByKey.id);
  const nodeStatement: NodeStatement = `${quotedId} ${attributeListStatement}`;
  return nodeStatement;
};

const getDirectedGraphCodeLineList = (graph: GraphLike): string[] => {
  const isCluster = graph.isCluster ?? false;

  const graphKeyword = graph.isRoot ? 'digraph' : 'subgraph';

  // TODO: use cluster=true attribute instead https://graphviz.org/docs/attrs/cluster/
  const idPrefix = isCluster ? 'cluster_' : '';
  const idSuffix = graph.isRoot ? '' : graph.attributeByKey.id;
  const id = `${idPrefix}${idSuffix}`;

  const quotedId = quoteId(id);

  const attributeStatementList = getAttributeStatementList(graph).map(
    (line) => {
      return `${indent}${line}`;
    },
  );

  const serializedRankGroupList = (graph.rankGroupList ?? []).map((group) => {
    const nodeIdList = group.map((nodeId) => `"${nodeId}"`);

    return `${indent}{ rank=same; ${nodeIdList.join('; ')}; }`;
  });

  const nodeStatementList = graph.nodeList.map((node) => {
    return `${indent}${getNodeStatement(node)}`;
  });

  const edgeStatementList = graph.edgeList.map((edge) => {
    return `${indent}${getEdgeStatement(edge)}`;
  });

  const subgraphLineList = graph.subgraphList
    .map((subgraph) => {
      return getDirectedGraphCodeLineList(subgraph);
    })
    .flat()
    .map((line) => `${indent}${line}`);

  return [
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
};

export const getGraphvizCode = (graph: DirectedGraph): string => {
  const lines = getDirectedGraphCodeLineList(graph);

  const code = lines.join('\n');

  return code;
};
