import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { getZorn } from '../../../utilities/getZorn';
import { RootGraphLocator } from './directed-graph/rootGraphLocator';
import { DirectedGraphMetadata } from './directedGraphMetadataById';

type BaseDirectedGraphMetadataEntry = {
  elementId: string;
  rootGraphLocator: RootGraphLocator;
  metadata: DirectedGraphMetadata;
};

type DirectedGraphMetadataEntryPrototype = {
  get zorn(): string;
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
    zorn: (metadataEntry) => {
      return getZorn([
        metadataEntry.rootGraphLocator.distinguisher,
        metadataEntry.elementId,
      ]);
    },
  });

export const DIRECTED_GRAPH_METADATA_ENTRY_GEPP =
  'directed-graph-metadata-entry';

type DirectedGraphMetadataEntryGepp = typeof DIRECTED_GRAPH_METADATA_ENTRY_GEPP;

export type DirectedGraphMetadataEntryVoque = InMemoryOdeshin2Voque<
  DirectedGraphMetadataEntryGepp,
  DirectedGraphMetadataEntry
>;
