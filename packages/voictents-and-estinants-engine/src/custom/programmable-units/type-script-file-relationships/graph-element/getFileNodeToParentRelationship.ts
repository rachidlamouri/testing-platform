import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  NODE_TO_GRAPH_RELATIONSHIP_GEPP,
  NodeToGraphRelationshipVoictent,
} from '../nodeToGraphRelationship';
import {
  FILE_NODE_METADATA_GEPP,
  FileNodeMetadataVoictent,
} from './fileNodeMetadata';

export const getFileNodeToParentRelationship = buildEstinant({
  name: 'getFileNodeToParentRelationship',
})
  .fromGrition<FileNodeMetadataVoictent>({
    gepp: FILE_NODE_METADATA_GEPP,
  })
  .toGrition<NodeToGraphRelationshipVoictent>({
    gepp: NODE_TO_GRAPH_RELATIONSHIP_GEPP,
    getZorn: (leftInput) => `internal/${leftInput.zorn}`,
  })
  .onPinbe((fileMetadata) => {
    return {
      parentId: fileMetadata.directoryId,
      childId: fileMetadata.id,
    };
  })
  .assemble();
