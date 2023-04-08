import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedSubgraph } from '../../graph-visualization/directed-graph/directedGraph';

export type BoundarySubgraphAttributeByKey = DirectedSubgraph['attributeByKey'];

export type BoundarySubgraphAttributeByKeyGrition =
  Grition<BoundarySubgraphAttributeByKey>;

export type BoundarySubgraphAttributeByKeyOdeshin =
  OdeshinFromGrition<BoundarySubgraphAttributeByKeyGrition>;

export const BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP =
  'boundary-subgraph-attribute-by-key';

export type BoundarySubgraphAttributeByKeyGepp =
  typeof BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP;

export type BoundarySubgraphAttributeByKeyVoictent = Voictent<
  BoundarySubgraphAttributeByKeyGepp,
  BoundarySubgraphAttributeByKeyOdeshin
>;
