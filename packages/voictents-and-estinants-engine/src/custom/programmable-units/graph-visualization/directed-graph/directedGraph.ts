import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedEdge } from './directedEdge';
import { Node } from './node';

export type DirectedGraph = {
  id: string;
  label: string;
  nodeList: Node[];
  edgeList: DirectedEdge[];
  subgraphList: DirectedGraph[];
};

export type DirectedGraphGrition = Grition<DirectedGraph>;

export type DirectedGraphOdeshin = OdeshinFromGrition<DirectedGraphGrition>;

export const DIRECTED_GRAPH_GEPP = 'directed-graph';

export type DirectedGraphGepp = typeof DIRECTED_GRAPH_GEPP;

export type DirectedGraphVoictent = Voictent<
  DirectedGraphGepp,
  DirectedGraphOdeshin
>;
