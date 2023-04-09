import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  NODE_TO_GRAPH_RELATIONSHIP_GEPP,
  NodeToGraphRelationshipVoictent,
} from '../nodeToGraphRelationship';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import { EXTERNAL_MODULE_GEPP, ExternalModuleVoictent } from './externalModule';

export const getExternalModuleNodeToParentRelationship = buildEstinant({
  name: 'getExternalModuleNodeToParentRelationship',
})
  .fromGrition<ExternalModuleVoictent>({
    gepp: EXTERNAL_MODULE_GEPP,
  })
  .andFromGritionTuple<BoundaryMetadataVoictent, [string]>({
    gepp: BOUNDARY_METADATA_GEPP,
    framate: () => ['external'],
    croard: (rightInput) => rightInput.zorn,
  })
  .toGrition<NodeToGraphRelationshipVoictent>({
    gepp: NODE_TO_GRAPH_RELATIONSHIP_GEPP,
    getZorn: (leftInput) => `external/${leftInput.zorn}`,
  })
  .onPinbe((externalModule, [externalBoundary]) => {
    return {
      parentId: externalBoundary.id,
      childId: externalModule.instanceId,
    };
  })
  .assemble();
