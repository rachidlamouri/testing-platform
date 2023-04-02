import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type DirectedGraphMetadatumField = {
  label: string;
  value: string;
};

export type DirectedGraphMetadata = {
  title: string;
  fieldList: DirectedGraphMetadatumField[];
};

export type DirectedGraphMetadataById = Record<string, DirectedGraphMetadata>;

export type DirectedGraphMetadataByIdOdeshin =
  OdeshinFromGrition<DirectedGraphMetadataById>;

export const DIRECTED_GRAPH_METADATA_BY_ID_GEPP =
  'directed-graph-metadata-by-id';

export type DirectedGraphMetadataByIdGepp =
  typeof DIRECTED_GRAPH_METADATA_BY_ID_GEPP;

export type DirectedGraphMetadataByIdVoictent = Voictent<
  DirectedGraphMetadataByIdGepp,
  DirectedGraphMetadataByIdOdeshin
>;
