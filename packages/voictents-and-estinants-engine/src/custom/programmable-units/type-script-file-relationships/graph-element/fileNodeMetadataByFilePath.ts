import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../../adapter/voictent';
import { FileNodeMetadata } from './fileNodeMetadata';

export type FileNodeMetadataByFilePath = {
  zorn: string;
  grition: Map<string, FileNodeMetadata>;
};

export const FILE_NODE_METADATA_BY_FILE_PATH_GEPP =
  'file-node-metadata-by-file-path';

export type FileNodeMetadataByFilePathGepp =
  typeof FILE_NODE_METADATA_BY_FILE_PATH_GEPP;

export type FileNodeMetadataByFilePathVoictent = Voictent<
  FileNodeMetadataByFilePathGepp,
  FileNodeMetadataByFilePath
>;

export type FileNodeMetadataByFilePathVoque = InMemoryOdeshin2Voque<
  FileNodeMetadataByFilePathGepp,
  FileNodeMetadataByFilePath
>;
