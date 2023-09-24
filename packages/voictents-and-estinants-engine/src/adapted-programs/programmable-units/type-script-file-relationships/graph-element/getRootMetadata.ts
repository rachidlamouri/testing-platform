import { buildEstinant } from '../../../../adapter/estinant-builder/estinantBuilder';
import {
  BOUNDARY_METADATA_GEPP,
  BoundaryMetadataVoque,
} from './boundaryMetadata';
import { FONT_SIZE, COMMON_ATTRIBUTE_BY_KEY } from './commonAttributeByKey';
import {
  INITIAL_EDGE_METADATA_LIST_GEPP,
  InitialEdgeMetadataListVoque,
} from './initialEdgeMetadataList';
import {
  ROOT_METADATA_GEPP,
  RootMetadata,
  RootMetadataVoque,
} from './rootMetadata';
import { getTextDigest } from '../../../../utilities/string/getTextDigest';
import { RankDirection } from '../../graph-visualization/directed-graph/attributeByKeyGS';
import { GraphLikeLabelLocation } from '../../graph-visualization/directed-graph/attributeByKeyGSC';

/**
 * Gets the root directed graph metadata for each boundary in the knowledge graph.
 * In the knowledge graph, this corresponds to the root SVG graph element for each tab on the left.
 */
export const getRootMetadata = buildEstinant({
  name: 'getRootMetadata',
})
  .fromHubblepup2<BoundaryMetadataVoque>({
    gepp: BOUNDARY_METADATA_GEPP,
  })
  .andFromVoictent2<InitialEdgeMetadataListVoque>({
    gepp: INITIAL_EDGE_METADATA_LIST_GEPP,
  })
  .toHubblepup2<RootMetadataVoque>({
    gepp: ROOT_METADATA_GEPP,
  })
  .onPinbe((boundaryMetadata, initialEdgeMetdataListList) => {
    const initialEdgeMetadataList = initialEdgeMetdataListList.flatMap(
      (element) => element.grition,
    );

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
      zorn: boundaryMetadata.zorn,
      id: getTextDigest(`${boundaryMetadata.id}-root`),
      boundaryId: boundaryMetadata.id,
      relevantBoundaryIdSet: new Set(relevantBoundaryIdList),
      importedBoundaryIdSet: new Set(importedBoundaryIdList),
      edgeMetadataList,
      attributeByKey: {
        rankdir: RankDirection.LeftRight,
        labelloc: GraphLikeLabelLocation.Top,
        fontsize: FONT_SIZE.root,
        nodesep: 1,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    } satisfies RootMetadata;
  })
  .assemble();
