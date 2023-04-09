import { Grition } from '../../../adapter/grition';
import { OdeshinFromGrition } from '../../../adapter/odeshin';
import { Voictent } from '../../../adapter/voictent';
import { FileNodeMetadata } from './fileNodeMetadata';

export type FileNodeMetadataByFilePath = Map<string, FileNodeMetadata>;

export type FileNodeMetadataByFilePathGrition =
  Grition<FileNodeMetadataByFilePath>;

export type FileNodeMetadataByFilePathOdeshin =
  OdeshinFromGrition<FileNodeMetadataByFilePathGrition>;

export const FILE_NODE_METADATA_BY_FILE_PATH_GEPP =
  'file-node-metadata-by-file-path';

export type FileNodeMetadataByFilePathGepp =
  typeof FILE_NODE_METADATA_BY_FILE_PATH_GEPP;

export type FileNodeMetadataByFilePathVoictent = Voictent<
  FileNodeMetadataByFilePathGepp,
  FileNodeMetadataByFilePathOdeshin
>;
