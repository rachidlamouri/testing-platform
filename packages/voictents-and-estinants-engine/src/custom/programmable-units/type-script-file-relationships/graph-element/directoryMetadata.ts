import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { DirectedSubgraph } from '../../graph-visualization/directed-graph/directedGraph';

/**
 * Information needed to add a directory to a directed graph in the knowledge
 * graph
 */
type DirectoryMetadata = {
  zorn: string;
  id: string;
  boundaryId: string;
  attributeByKey: Omit<DirectedSubgraph['attributeByKey'], 'id'>;
};

export const DIRECTORY_METADATA_GEPP = 'directory-metadata';

type DirectoryMetadataGepp = typeof DIRECTORY_METADATA_GEPP;

export type DirectoryMetadataVoque = InMemoryOdeshin2Voque<
  DirectoryMetadataGepp,
  DirectoryMetadata
>;
