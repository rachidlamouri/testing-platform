import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../../adapter/voictent';
import { DirectedSubgraph } from '../../graph-visualization/directed-graph/directedGraph';

/**
 * Information needed to add a directory to a directed graph in the knowledge
 * graph
 */
export type DirectoryMetadata = {
  zorn: string;
  id: string;
  boundaryId: string;
  attributeByKey: Omit<DirectedSubgraph['attributeByKey'], 'id'>;
};

export const DIRECTORY_METADATA_GEPP = 'directory-metadata';

export type DirectoryMetadataGepp = typeof DIRECTORY_METADATA_GEPP;

export type DirectoryMetadataVoictent = Voictent<
  DirectoryMetadataGepp,
  DirectoryMetadata
>;

export type DirectoryMetadataVoque = InMemoryOdeshin2Voque<
  DirectoryMetadataGepp,
  DirectoryMetadata
>;
