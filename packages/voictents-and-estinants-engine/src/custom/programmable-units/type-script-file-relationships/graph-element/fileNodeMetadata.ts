import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../../adapter/voictent';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/directedGraphNode';

/**
 * Information needed to add a file to a directed graph in the knowledge graph
 */
export type FileNodeMetadata = {
  zorn: string;
  id: string;
  directoryId: string;
  boundaryId: string;
  filePath: string;
  attributeByKey: Omit<DirectedGraphNode['attributeByKey'], 'id'>;
};

export const FILE_NODE_METADATA_GEPP = 'file-node-metadata';

export type FileNodeMetadataGepp = typeof FILE_NODE_METADATA_GEPP;

export type FileNodeMetadataVoictent = Voictent<
  FileNodeMetadataGepp,
  FileNodeMetadata
>;

export type FileNodeMetadataVoque = InMemoryOdeshin2Voque<
  FileNodeMetadataGepp,
  FileNodeMetadata
>;
