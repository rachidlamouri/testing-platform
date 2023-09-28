import { InMemoryOdeshin2ListVoque } from '../../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { FileNodeMetadata } from './fileNodeMetadata';

/**
 * Mapping of file node metadata by filepath for easier lookups
 */
export type FileNodeMetadataByFilePath = {
  zorn: string;
  grition: Map<string, FileNodeMetadata>;
};

export const FILE_NODE_METADATA_BY_FILE_PATH_GEPP =
  'file-node-metadata-by-file-path';

type FileNodeMetadataByFilePathGepp =
  typeof FILE_NODE_METADATA_BY_FILE_PATH_GEPP;

export type FileNodeMetadataByFilePathVoque = InMemoryOdeshin2ListVoque<
  FileNodeMetadataByFilePathGepp,
  FileNodeMetadataByFilePath
>;
