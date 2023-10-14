import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

export type DirectedGraphMetadatumField = {
  label: string;
  value: string;
};

export type DirectedGraphMetadata = {
  title: string;
  fieldList: DirectedGraphMetadatumField[];
};

/**
 * An object that is used by the interactive HTML file to display metadata about
 * the selected graph element
 */
export type DirectedGraphMetadataById = {
  id: string;
  subitem: Record<string, DirectedGraphMetadata>;
};

export const DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID =
  'directed-graph-metadata-by-id';

type DirectedGraphMetadataByIdGepp =
  typeof DIRECTED_GRAPH_METADATA_BY_ID_COLLECTION_ID;

export type DirectedGraphMetadataByIdStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    DirectedGraphMetadataByIdGepp,
    DirectedGraphMetadataById
  >;
