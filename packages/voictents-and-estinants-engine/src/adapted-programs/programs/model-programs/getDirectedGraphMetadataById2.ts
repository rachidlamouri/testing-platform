import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { mutateDirectedGraphMetadataById } from '../../programmable-units/graph-visualization/directed-graph/mutateGraphLikeElementListOrder';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID,
  DirectedGraphMetadataById,
  DirectedGraphMetadataByIdStreamMetatype,
} from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

/**
 * Aggregates directed graph metadata entries into a single object,
 * so that interactive HTML files can lookup metadata by graph node id
 */
export const getDirectedGraphMetadataById2 = buildProgrammedTransform({
  name: 'getDirectedGraphMetadataById2',
})
  .fromCollection2<DirectedGraphMetadataEntryVoque>({
    collectionId: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .toItemTuple2<DirectedGraphMetadataByIdStreamMetatype>({
    collectionId: DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID,
  })
  .onTransform((entryList) => {
    const metadataByIdByRootGraphDebugName = new Map<
      string,
      DirectedGraphMetadataById
    >();

    entryList.forEach((entry) => {
      const metadataById: DirectedGraphMetadataById =
        metadataByIdByRootGraphDebugName.get(
          entry.rootGraphLocator.id.forHuman,
        ) ?? {
          id: entry.rootGraphLocator.id.forHuman,
          subitem: {},
        };

      metadataById.subitem[entry.elementId] = entry.metadata;

      metadataByIdByRootGraphDebugName.set(
        entry.rootGraphLocator.id.forHuman,
        metadataById,
      );
    });

    const outputList = [...metadataByIdByRootGraphDebugName.values()];

    outputList.forEach((metadataById) => {
      mutateDirectedGraphMetadataById(metadataById);
    });

    return outputList;
  })
  .assemble();
