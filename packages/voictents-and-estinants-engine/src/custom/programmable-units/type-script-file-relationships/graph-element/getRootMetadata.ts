import * as uuid from 'uuid';
import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { LabelLocation } from '../../graph-visualization/directed-graph/attribute';
import { DirectedGraphRankDirection } from '../../graph-visualization/directed-graph/directedGraph';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoictent,
} from './boundaryMetadata';
import { FONT_SIZE, COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';
import {
  INITIAL_EDGE_METADATA_LIST_GEPP,
  InitialEdgeMetadataListVoictent,
} from './initialEdgeMetadataList';
import {
  ROOT_METADATA_GEPP,
  RootMetadata,
  RootMetadataVoictent,
} from './rootMetadata';

/**
 * Gets the root directed graph metadata for each boundary in the knowledge graph.
 * In the knowledge graph, this corresponds to the root SVG graph element for each tab on the left.
 */
export const getRootMetadata = buildEstinant({
  name: 'getRootMetadata',
})
  .fromGrition<BoundaryMetadataVoictent>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .andFromOdeshinVoictent<InitialEdgeMetadataListVoictent>({
    gepp: INITIAL_EDGE_METADATA_LIST_GEPP,
  })
  .toGrition<RootMetadataVoictent>({
    gepp: ROOT_METADATA_GEPP,
    getZorn: (leftInput) => leftInput.zorn,
  })
  .onPinbe((boundaryMetadata, initialEdgeMetdataListList) => {
    const initialEdgeMetadataList = initialEdgeMetdataListList.flat();

    const edgeMetadataList = initialEdgeMetadataList.filter((metadata) => {
      return (
        metadata.tail.boundaryId === boundaryMetadata.id ||
        metadata.head.boundaryId === boundaryMetadata.id
      );
    });

    const relevantBoundaryIdList = edgeMetadataList.flatMap((metadata) => {
      return [metadata.tail.boundaryId, metadata.head.boundaryId];
    });

    const importedBoundaryIdList = edgeMetadataList
      .filter((metadata) => metadata.head.boundaryId !== boundaryMetadata.id)
      .map((metadata) => metadata.head.boundaryId);

    return {
      id: uuid.v4(),
      boundaryId: boundaryMetadata.id,
      relevantBoundaryIdSet: new Set(relevantBoundaryIdList),
      importedBoundaryIdSet: new Set(importedBoundaryIdList),
      edgeMetadataList,
      attributeByKey: {
        rankdir: DirectedGraphRankDirection.LeftRight,
        labelloc: LabelLocation.Top,
        fontsize: FONT_SIZE.root,
        nodesep: 1,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    } satisfies RootMetadata;
  })
  .assemble();
