import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { DirectedGraph } from '../../graph-visualization/directed-graph/directedGraph';
import { InitialEdgeMetadata } from './initialEdgeMetadataList';

/**
 * List of information needed to add a root graph to a directed graph in the knowledge graph
 */
export type RootMetadata = {
  zorn: string;
  id: string;
  boundaryId: string;
  relevantBoundaryIdSet: Set<string>;
  importedBoundaryIdSet: Set<string>;
  edgeMetadataList: InitialEdgeMetadata[];
  attributeByKey: Omit<DirectedGraph['attributeByKey'], 'id'>;
};

export const ROOT_METADATA_GEPP = 'root-metadata';

type RootMetadataGepp = typeof ROOT_METADATA_GEPP;
export type RootMetadataVoque = InMemoryOdeshin2Voque<
  RootMetadataGepp,
  RootMetadata
>;
