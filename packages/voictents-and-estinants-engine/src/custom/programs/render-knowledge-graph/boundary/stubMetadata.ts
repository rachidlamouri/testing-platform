import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraphVoque,
} from '../../../programmable-units/graph-visualization/directed-graph/directedGraph';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataByIdVoque,
} from '../../../programmable-units/graph-visualization/directedGraphMetadataById';

/**
 * Gives each directed graph a metadata object so they get added to the
 * knowledge graph
 */
export const stubMetadata = buildEstinant({
  name: 'stubMetadata',
})
  .fromHubblepup2<DirectedGraphVoque>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .toHubblepup2<DirectedGraphMetadataByIdVoque>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  })
  .onPinbe((directedGraph) => {
    return {
      zorn: directedGraph.zorn,
      grition: {},
    };
  })
  .assemble();
