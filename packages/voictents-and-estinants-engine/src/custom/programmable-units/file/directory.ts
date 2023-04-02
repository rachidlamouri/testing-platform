import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type Directory = {
  instanceId: string;
  directoryPath: string;
  directoryPathPartList: string[];
};

export type DirectoryGrition = Grition<Directory>;

export type DirectoryOdeshin = OdeshinFromGrition<DirectoryGrition>;

export const DIRECTORY_GEPP = 'directory';

export type DirectoryGepp = typeof DIRECTORY_GEPP;

export type DirectoryVoictent = Voictent<DirectoryGepp, DirectoryOdeshin>;
