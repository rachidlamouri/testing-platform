import { DirectedEdge } from './directedEdge';
import { DirectedGraph } from './directedGraph';
import { Node } from './node';

export type DirectedGraphCodeLineListAccessorInput = {
  graph: DirectedGraph;
  isRoot: boolean;
};

const indent = '  ' as const;

const getEdgeCodeLine = (edge: DirectedEdge): string => {
  return `"${edge.tailId}" -> "${edge.headId}"`;
};

const getNodeCodeLine = (node: Node): string => {
  return `"${node.id}" [ "label"="${node.label}" ]`;
};

const getDirectedGraphCodeLineList = ({
  graph,
  isRoot,
}: DirectedGraphCodeLineListAccessorInput): string[] => {
  const graphKeyword = isRoot ? 'digraph' : 'subgraph';
  const id = isRoot ? graph.id : `cluster_${graph.id}`;

  const linesA = [`${graphKeyword} "${id}" {`];

  const linesN = graph.nodeList.map((node) => {
    return `${indent}${getNodeCodeLine(node)}`;
  });

  const linesE = graph.edgeList.map((edge) => {
    return `${indent}${getEdgeCodeLine(edge)}`;
  });

  const linesS = graph.subgraphList
    .map((subgraph) => {
      return getDirectedGraphCodeLineList({
        graph: subgraph,
        isRoot: false,
      });
    })
    .flat()
    .map((line) => `${indent}${line}`);

  const linesZ = [`}`];

  return [...linesA, '', ...linesN, '', ...linesE, '', ...linesS, ...linesZ];
};

export const getGraphvizCode = (graph: DirectedGraph): string => {
  const lines = getDirectedGraphCodeLineList({
    graph,
    isRoot: true,
  });

  const code = lines.join('\n');

  return code;
};
