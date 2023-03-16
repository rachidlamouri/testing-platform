import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraph, DirectedSubgraph } from './directedGraph';
import { DirectedGraphNode } from './directedGraphNode';

const indent = '  ' as const;

type QuotedText = `"${string}"`;

type AttributeStatement = `${QuotedText}=${QuotedText};`;

// This should be a recursive template literal of "AttributeStatement", but that feature is not supported
type AttributeListStatement = `[ ${AttributeStatement} ]`;

// TODO: escape all values before serializing between quotes
const quote = (text: string): QuotedText => `"${text}"`;

const getAttributeStatementList = (
  node: DirectedGraph | DirectedGraphNode | DirectedGraphEdge,
): AttributeStatement[] => {
  return Object.entries(node.attributeByKey)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]): AttributeStatement => {
      return `${quote(key)}=${quote(value)};`;
    });
};

const joinAttributeListSingleLine = (list: string[]): AttributeListStatement =>
  `[ ${list.join(' ')} ]` as AttributeListStatement;

type EdgeRelationshipStatement = `${QuotedText} -> ${QuotedText}`;

type EdgeStatement = `${EdgeRelationshipStatement} ${AttributeListStatement}`;

const getEdgeStatement = (edge: DirectedGraphEdge): EdgeStatement => {
  const attributeStatementList = getAttributeStatementList(edge);

  const attributeListStatement = joinAttributeListSingleLine(
    attributeStatementList,
  );

  const quotedTailId = quote(edge.tailId);
  const quotedHeadId = quote(edge.headId);
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

  const quotedId = quote(node.attributeByKey.id);
  const nodeStatement: NodeStatement = `${quotedId} ${attributeListStatement}`;
  return nodeStatement;
};

const getDirectedGraphCodeLineList = (
  graph: DirectedGraph | DirectedSubgraph,
): string[] => {
  const graphKeyword = graph.isRoot ? 'digraph' : 'subgraph';

  const quotedId = quote(graph.attributeByKey.id ?? '');

  const attributeStatementList = getAttributeStatementList(graph).map(
    (line) => {
      return `${indent}${line}`;
    },
  );

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
    ...edgeStatementList,
    '',
    ...subgraphLineList,
    '}',
  ];
};

export const getGraphvizCode = (graph: DirectedGraph): string => {
  const lines = getDirectedGraphCodeLineList(graph);

  const code = lines.join('\n');

  return code;
};
