import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { mutateDirectedGraphMetadataById } from '../../programmable-units/graph-visualization/directed-graph/mutateGraphLikeElementListOrder';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataById,
  DirectedGraphMetadataByIdVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataById';
import {
  DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  DirectedGraphMetadataEntryVoque,
} from '../../programmable-units/graph-visualization/directedGraphMetadataEntry';

/**
 * Aggregates directed graph metadata entries into a single object,
 * so that interactive HTML files can lookup metadata by graph node id
 */
export const getDirectedGraphMetadataById2 = buildEstinant({
  name: 'getDirectedGraphMetadataById2',
})
  .fromVoictent2<DirectedGraphMetadataEntryVoque>({
    gepp: DIRECTED_GRAPH_METADATA_ENTRY_GEPP,
  })
  .toHubblepupTuple2<DirectedGraphMetadataByIdVoque>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  })
  .onPinbe((entryList) => {
    const metadataByIdByRootGraphDebugName = new Map<
      string,
      DirectedGraphMetadataById
    >();

    entryList.forEach((entry) => {
      const metadataById: DirectedGraphMetadataById =
        metadataByIdByRootGraphDebugName.get(
          entry.rootGraphLocator.zorn.forHuman,
        ) ?? {
          zorn: entry.rootGraphLocator.zorn.forHuman,
          grition: {},
        };

      metadataById.grition[entry.elementId] = entry.metadata;

      metadataByIdByRootGraphDebugName.set(
        entry.rootGraphLocator.zorn.forHuman,
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
