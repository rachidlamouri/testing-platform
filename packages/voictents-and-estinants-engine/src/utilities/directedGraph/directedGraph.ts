import {
  DirectedEdge,
  getDirectedEdgeGraphvizCodeLine,
} from '../../custom/programmable-units/graph-visualization/directed-graph/directedEdge';
import { Node, getNodeDotLine } from './node';

export type DirectedGraph = {
  id: string;
  label: string;
  nodeList: Node[];
  edgeList: DirectedEdge[];
  subgraphList: DirectedGraph[];
};

const indent = '  ';

const getDirectedGraphDotLines = (
  graph: DirectedGraph,
  isRoot: boolean,
): string[] => {
  const graphKeyword = isRoot ? 'digraph' : 'subgraph';
  const id = isRoot ? graph.id : `cluster_${graph.id}`;

  const linesA = [`${graphKeyword} "${id}" {`];

  const linesN = graph.nodeList.map((node) => {
    return `${indent}${getNodeDotLine(node)}`;
  });

  const linesE = graph.edgeList.map((edge) => {
    return `${indent}${getDirectedEdgeGraphvizCodeLine(edge)}`;
  });

  const linesS = graph.subgraphList
    .map((subgraph) => {
      return getDirectedGraphDotLines(subgraph, false);
    })
    .flat()
    .map((line) => `${indent}${line}`);

  const linesZ = [`}`];

  return [...linesA, ...linesN, '', ...linesE, '', ...linesS, ...linesZ];
};

export const getRootDirectedGraphDotLines = (graph: DirectedGraph): string => {
  const lines = getDirectedGraphDotLines(graph, true);
  const output = lines.join('\n');
  return output;
};
