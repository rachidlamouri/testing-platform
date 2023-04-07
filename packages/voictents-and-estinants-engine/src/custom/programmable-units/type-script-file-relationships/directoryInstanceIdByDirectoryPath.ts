import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type DirectoryInstanceIdByDirectoryPath = Map<string, string>;

export type DirectoryInstanceIdByDirectoryPathGrition =
  Grition<DirectoryInstanceIdByDirectoryPath>;

export type DirectoryInstanceIdByDirectoryPathOdeshin =
  OdeshinFromGrition<DirectoryInstanceIdByDirectoryPathGrition>;

export const DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP =
  'directory-instance-id-by-file-path';

export type DirectoryInstanceIdByDirectoryPathGepp =
  typeof DIRECTORY_INSTANCE_ID_BY_FILE_PATH_GEPP;

export type DirectoryInstanceIdByDirectoryPathVoictent = Voictent<
  DirectoryInstanceIdByDirectoryPathGepp,
  DirectoryInstanceIdByDirectoryPathOdeshin
>;
