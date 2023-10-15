import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../package-agnostic-utilities/deprecated-constructor-function/buildConstructorFunction';
import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import { RootGraphLocator } from './directed-graph/rootGraphLocator';
import { DirectedGraphMetadata } from './directedGraphMetadataById';

type BaseDirectedGraphMetadataEntry = {
  elementId: string;
  rootGraphLocator: RootGraphLocator;
  metadata: DirectedGraphMetadata;
};

type DirectedGraphMetadataEntryPrototype = {
  get id(): string;
};

/**
 * A set of information about an element in a directed graph
 */
type DirectedGraphMetadataEntry = ObjectWithPrototype<
  BaseDirectedGraphMetadataEntry,
  DirectedGraphMetadataEntryPrototype
>;

export const { DirectedGraphMetadataEntryInstance } =
  buildConstructorFunctionWithName('DirectedGraphMetadataEntryInstance')<
    BaseDirectedGraphMetadataEntry,
    DirectedGraphMetadataEntryPrototype
  >({
    id: (metadataEntry) => {
      return getId([
        metadataEntry.rootGraphLocator.distinguisher,
        metadataEntry.elementId,
      ]);
    },
  });

export const DIRECTED_GRAPH_METADATA_ENTRY_COLLECTION_ID =
  'directed-graph-metadata-entry';

type DirectedGraphMetadataEntryGepp =
  typeof DIRECTED_GRAPH_METADATA_ENTRY_COLLECTION_ID;

export type DirectedGraphMetadataEntryStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    DirectedGraphMetadataEntryGepp,
    DirectedGraphMetadataEntry
  >;
