import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTORY_METADATA_GEPP,
  DirectoryMetadataVoictent,
} from './directoryMetadata';
import {
  SubgraphToGraphRelationshipVoictent,
  SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
} from './subgraphToGraphRelationship';

export const getDirectorySubgraphToParentRelationship = buildEstinant({
  name: 'getDirectorySubgraphToParentRelationship',
})
  .fromGrition<DirectoryMetadataVoictent>({
    gepp: DIRECTORY_METADATA_GEPP,
  })
  .toGrition<SubgraphToGraphRelationshipVoictent>({
    gepp: SUBGRAPH_TO_GRAPH_RELATIONSHIP_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((directoryMetadata) => {
    return {
      parentId: directoryMetadata.boundaryId,
      childId: directoryMetadata.id,
    };
  })
  .assemble();
