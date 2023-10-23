import { DirectedCluster } from './directedCluster';
import { DirectedEdge } from './directedEdge';
import { DirectedGraphElement } from './directedGraphElement';
import { DirectedSubgraph } from './directedSubgraph';
import { DirectedSubgraphLike } from './directedSubgraphLike';

export const isDirectedSubgraph = (
  element: DirectedGraphElement,
): element is DirectedSubgraph => element instanceof DirectedSubgraph;

const isDirectedCluster = (
  element: DirectedGraphElement,
): element is DirectedCluster => element instanceof DirectedCluster;

export const isDirectedSubgraphLike = (
  element: DirectedGraphElement,
): element is DirectedSubgraphLike => {
  return isDirectedSubgraph(element) || isDirectedCluster(element);
};

export const isDirectedEdge = (
  element: DirectedGraphElement,
): element is DirectedEdge => element instanceof DirectedEdge;
