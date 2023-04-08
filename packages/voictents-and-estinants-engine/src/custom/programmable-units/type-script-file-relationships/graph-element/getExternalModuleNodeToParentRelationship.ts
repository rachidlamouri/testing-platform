import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  NODE_TO_GRAPH_RELATIONSHIP_GEPP,
  NodeToGraphRelationshipVoictent,
} from '../nodeToGraphRelationship';
import { EXTERNAL_BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY } from './externalBoundarySubgraph';
import { EXTERNAL_MODULE_GEPP, ExternalModuleVoictent } from './externalModule';

export const getExternalModuleNodeToParentRelationship = buildEstinant({
  name: 'getExternalModuleNodeToParentRelationship',
})
  .fromGrition<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .toGrition<NodeToGraphRelationshipVoictent>({
    gepp: NODE_TO_GRAPH_RELATIONSHIP_GEPP,
    getZorn: (leftInput) => `external/${leftInput.zorn}`,
  })
  .onPinbe((externalModule) => {
    return {
      parentId: EXTERNAL_BOUNDARY_SUBGRAPH_ATTRIBUTE_BY_KEY.id,
      childId: externalModule.instanceId,
    };
  })
  .assemble();
