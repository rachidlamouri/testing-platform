import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';
import { RootGraphLocator } from './directed-graph/rootGraphLocator';
import { DirectedGraphMetadata } from './directedGraphMetadataById';

export type DirectedGraphMetadataEntry = {
  elementId: string;
  rootGraphLocator: RootGraphLocator;
  metadata: DirectedGraphMetadata;
};

export const DIRECTED_GRAPH_METADATA_ENTRY_GEPP =
  'directed-graph-metadata-entry';

export type DirectedGraphMetadataEntryGepp =
  typeof DIRECTED_GRAPH_METADATA_ENTRY_GEPP;

export type DirectedGraphMetadataEntryVoque = StandardInMemoryVoque<
  DirectedGraphMetadataEntryGepp,
  DirectedGraphMetadataEntry
>;
