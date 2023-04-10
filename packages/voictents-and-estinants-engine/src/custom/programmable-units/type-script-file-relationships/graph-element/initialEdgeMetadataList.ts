import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { ExternalModuleMetadata } from './externalModuleMetadata';
import { FileNodeMetadata } from './fileNodeMetadata';

export type InitialEdgeMetadata = {
  tail: FileNodeMetadata;
  head: FileNodeMetadata | ExternalModuleMetadata;
};

export type InitialEdgeMetadataList = InitialEdgeMetadata[];

export type InitialEdgeMetadataListGrition = Grition<InitialEdgeMetadataList>;

export type InitialEdgeMetadataListOdeshin =
  OdeshinFromGrition<InitialEdgeMetadataListGrition>;

export const INITIAL_EDGE_METADATA_LIST_GEPP = 'initial-edge-metadata-list';

export type InitialEdgeMetadataListGepp =
  typeof INITIAL_EDGE_METADATA_LIST_GEPP;

export type InitialEdgeMetadataListVoictent = Voictent<
  InitialEdgeMetadataListGepp,
  InitialEdgeMetadataListOdeshin
>;
