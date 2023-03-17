import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export enum CustomDirectedGraphElementTypeName {
  Graph = 'Graph',
  Node = 'Node',
  Edge = 'Edge',
}

export type CustomDirectedGraphNode = {
  typeName: CustomDirectedGraphElementTypeName.Node;
  id: string;
  label: string;
};

export type CustomDirectedGraphEdge = {
  typeName: CustomDirectedGraphElementTypeName.Edge;
  id: string;
  tailId: string;
  headId: string;
};

export type CustomDirectedGraph = {
  typeName: CustomDirectedGraphElementTypeName.Graph;
  id: string;
  label: string;
  nodeList: CustomDirectedGraphNode[];
  edgeList: CustomDirectedGraphEdge[];
  subgraphList: CustomDirectedGraph[];
};

export type CustomDirectedGraphElement =
  | CustomDirectedGraph
  | CustomDirectedGraphEdge
  | CustomDirectedGraphNode;

export type CustomDirectedGraphGrition = Grition<CustomDirectedGraph>;

export type CustomDirectedGraphOdeshin =
  OdeshinFromGrition<CustomDirectedGraphGrition>;

export const CUSTOM_DIRECTED_GRAPH_GEPP = 'custom-directed-graph';

export type CustomDirectedGraphGepp = typeof CUSTOM_DIRECTED_GRAPH_GEPP;

export type CustomDirectedGraphVoictent = Voictent<
  CustomDirectedGraphGepp,
  CustomDirectedGraphOdeshin
>;
