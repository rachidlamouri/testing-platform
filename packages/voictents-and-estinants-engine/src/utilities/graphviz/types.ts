export type Node = {
  id: unknown;
  label: string;
};

export type Edge = {};

export type DirectedGraph = {
  nodeList: Node[];
  edgeList: Edge[];
  subgraphList: DirectedGraph[];
};
