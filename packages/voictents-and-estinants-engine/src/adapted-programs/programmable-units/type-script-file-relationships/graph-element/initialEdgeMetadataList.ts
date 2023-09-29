import { InMemoryOdeshin2ListVoque } from '../../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { ExternalModuleMetadata } from './externalModuleMetadata';
import { FileNodeMetadata } from './fileNodeMetadata';

export type InitialEdgeMetadata = {
  tail: FileNodeMetadata;
  head: FileNodeMetadata | ExternalModuleMetadata;
};

/**
 * List of information needed to add an edge to a directed graph in the knowledge graph
 *
 * @todo this doesn't have to be "initial". There is not other edge metadata
 */
export type InitialEdgeMetadataList = {
  zorn: string;
  grition: InitialEdgeMetadata[];
};

export const INITIAL_EDGE_METADATA_LIST_GEPP = 'initial-edge-metadata-list';

type InitialEdgeMetadataListGepp = typeof INITIAL_EDGE_METADATA_LIST_GEPP;

export type InitialEdgeMetadataListVoque = InMemoryOdeshin2ListVoque<
  InitialEdgeMetadataListGepp,
  InitialEdgeMetadataList
>;
