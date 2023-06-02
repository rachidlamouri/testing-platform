import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';

/**
 * A map of directories to their instance id
 */
export type DirectoryInstanceIdByDirectoryPath = {
  zorn: string;
  grition: Map<string, string>;
};

export const DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP =
  'directory-instance-id-by-file-path';

type DirectoryInstanceIdByDirectoryPathGepp =
  typeof DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP;

export type DirectoryInstanceIdByDirectoryPathVoque = InMemoryOdeshin2Voque<
  DirectoryInstanceIdByDirectoryPathGepp,
  DirectoryInstanceIdByDirectoryPath
>;
