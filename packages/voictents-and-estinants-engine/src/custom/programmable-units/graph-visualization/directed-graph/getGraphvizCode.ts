import { DirectedGraphEdge } from './directedGraphEdge';
import { DirectedGraph, DirectedSubgraph } from './directedGraph';
import { DirectedGraphNode } from './directedGraphNode';

const indent = '  ' as const;

type QuotedText = `"${string}"`;

type AttributeStatement = `${QuotedText}=${QuotedText};`;

// This should be a recursive template literal of "AttributeStatement", but that feature is not supported
type AttributeListStatement = `[ ${AttributeStatement} ]`;

const quote = (text: string): QuotedText => `"${text}"`;

// TODO: update graph ids to be uuids that are easy to map to other data
const escapeId = (text: string): string => text.replaceAll(/(\/|@|\.)/g, '__');
const quoteId = (text: string): QuotedText => quote(escapeId(text));

const getAttributeStatementList = (
  node: DirectedGraph | DirectedGraphNode | DirectedGraphEdge,
): AttributeStatement[] => {
  return Object.entries(node.attributeByKey)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]): AttributeStatement => {
      const quotedKey = quote(key);
      const quotedValue = key === 'id' ? quoteId(value) : quote(value);

      return `${quotedKey}=${quotedValue};`;
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

  const quotedTailId = quoteId(edge.tailId);
  const quotedHeadId = quoteId(edge.headId);
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

const getDirectedGraphCodeLineList = (
  graph: DirectedGraph | DirectedSubgraph,
): string[] => {
  const graphKeyword = graph.isRoot ? 'digraph' : 'subgraph';

  const quotedId = quoteId(graph.attributeByKey.id ?? '');

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
