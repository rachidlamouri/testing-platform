import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedGraphEdge } from '../../graph-visualization/directed-graph/directedGraphEdge';

export type ImportRelationshipEdge = DirectedGraphEdge;

export type ImportRelationshipEdgeGrition = Grition<ImportRelationshipEdge>;

export type ImportRelationshipEdgeOdeshin =
  OdeshinFromGrition<ImportRelationshipEdgeGrition>;

export const IMPORT_RELATIONSHIP_EDGE_GEPP = 'import-relationship-edge';

export type ImportRelationshipEdgeGepp = typeof IMPORT_RELATIONSHIP_EDGE_GEPP;

export type ImportRelationshipEdgeVoictent = Voictent<
  ImportRelationshipEdgeGepp,
  ImportRelationshipEdgeOdeshin
>;
