import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/directedGraphNode';

export type FileNodeMetadata = {
  id: string;
  directoryId: string;
  boundaryId: string;
  filePath: string;
  attributeByKey: Omit<DirectedGraphNode['attributeByKey'], 'id'>;
};

export type FileNodeMetadataGrition = Grition<FileNodeMetadata>;

export type FileNodeMetadataOdeshin =
  OdeshinFromGrition<FileNodeMetadataGrition>;

export const FILE_NODE_METADATA_GEPP = 'file-node-metadata';

export type FileNodeMetadataGepp = typeof FILE_NODE_METADATA_GEPP;

export type FileNodeMetadataVoictent = Voictent<
  FileNodeMetadataGepp,
  FileNodeMetadataOdeshin
>;
