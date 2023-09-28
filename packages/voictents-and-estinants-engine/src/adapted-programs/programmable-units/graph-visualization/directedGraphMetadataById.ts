import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';

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
  zorn: string;
  grition: Record<string, DirectedGraphMetadata>;
};

export const DIRECTED_GRAPH_METADATA_BY_ID_GEPP =
  'directed-graph-metadata-by-id';

type DirectedGraphMetadataByIdGepp = typeof DIRECTED_GRAPH_METADATA_BY_ID_GEPP;

export type DirectedGraphMetadataByIdVoque = InMemoryOdeshin2ListVoque<
  DirectedGraphMetadataByIdGepp,
  DirectedGraphMetadataById
>;
