import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';

export type DirectedGraphMetadatumField = {
  label: string;
  value: string;
};

export type DirectedGraphMetadata = {
  title: string;
  fieldList: DirectedGraphMetadatumField[];
};

export type DirectedGraphMetadataById = {
  zorn: string;
  grition: Record<string, DirectedGraphMetadata>;
};

export const DIRECTED_GRAPH_METADATA_BY_ID_GEPP =
  'directed-graph-metadata-by-id';

export type DirectedGraphMetadataByIdGepp =
  typeof DIRECTED_GRAPH_METADATA_BY_ID_GEPP;

export type DirectedGraphMetadataByIdVoictent = Voictent<
  DirectedGraphMetadataByIdGepp,
  DirectedGraphMetadataById
>;

export type DirectedGraphMetadataByIdVoque = InMemoryOdeshin2Voque<
  DirectedGraphMetadataByIdGepp,
  DirectedGraphMetadataById
>;
