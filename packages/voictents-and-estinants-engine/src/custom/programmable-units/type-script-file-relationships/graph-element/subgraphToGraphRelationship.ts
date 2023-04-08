import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';

export type SubgraphToGraphRelationship = {
  parentId: string;
  childId: string;
};

export type SubgraphToGraphRelationshipGrition =
  Grition<SubgraphToGraphRelationship>;

export type SubgraphToGraphRelationshipOdeshin =
  OdeshinFromGrition<SubgraphToGraphRelationshipGrition>;

export const SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP =
  'subgraph-to-graph-relationship';

export type SubgraphToGraphRelationshipGepp =
  typeof SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP;

export type SubgraphToGraphRelationshipVoictent = Voictent<
  SubgraphToGraphRelationshipGepp,
  SubgraphToGraphRelationshipOdeshin
>;
