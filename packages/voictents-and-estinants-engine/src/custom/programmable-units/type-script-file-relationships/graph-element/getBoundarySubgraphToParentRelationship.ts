import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  BOUNDARY_CONFIGURATION_GEPP,
  BoundaryConfigurationVoictent,
} from '../boundaryConfiguration';
import { ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY } from './rootDirectedGraph';
import {
  SubgraphToGraphRelationshipVoictent,
  SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
} from './subgraphToGraphRelationship';

export const getBoundarySubgraphToParentRelationship = buildEstinant({
  name: 'getBoundarySubgraphToParentRelationship',
})
  .fromGrition<BoundaryConfigurationVoictent>({
    gepp: BOUNDARY_CONFIGURATION_GEPP,
  })
  .toGrition<SubgraphToGraphRelationshipVoictent>({
    gepp: SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((boundary) => {
    return {
      parentId: ROOT_DIRECTED_GRAPH_ATTRIBUTE_BY_KEY.id,
      childId: boundary.instanceId,
    };
  })
  .assemble();
