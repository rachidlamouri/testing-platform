import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedSubgraph } from '../../graph-visualization/directed-graph/directedGraph';

export type DirectoryMetadata = {
  id: string;
  boundaryId: string;
  attributeByKey: Omit<DirectedSubgraph['attributeByKey'], 'id'>;
};

export type DirectoryMetadataGrition = Grition<DirectoryMetadata>;

export type DirectoryMetadataOdeshin =
  OdeshinFromGrition<DirectoryMetadataGrition>;

export const DIRECTORY_METADATA_GEPP = 'directory-metadata';

export type DirectoryMetadataGepp = typeof DIRECTORY_METADATA_GEPP;

export type DirectoryMetadataVoictent = Voictent<
  DirectoryMetadataGepp,
  DirectoryMetadataOdeshin
>;
