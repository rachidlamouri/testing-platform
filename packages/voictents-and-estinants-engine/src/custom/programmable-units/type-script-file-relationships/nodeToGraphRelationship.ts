import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type NodeToGraphRelationship = {
  parentId: string;
  childId: string;
};

export type NodeToGraphRelationshipGrition = Grition<NodeToGraphRelationship>;

export type NodeToGraphRelationshipOdeshin =
  OdeshinFromGrition<NodeToGraphRelationshipGrition>;

export const NODE_TO_GRAPH_RELATIONSHIP_GEPP = 'node-to-graph-relationship';

export type NodeToGraphRelationshipGepp =
  typeof NODE_TO_GRAPH_RELATIONSHIP_GEPP;

export type NodeToGraphRelationshipVoictent = Voictent<
  NodeToGraphRelationshipGepp,
  NodeToGraphRelationshipOdeshin
>;
