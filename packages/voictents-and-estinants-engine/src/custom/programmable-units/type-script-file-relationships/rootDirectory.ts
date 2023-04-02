import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { Directory } from '../file/directory';

export type RootDirectory = Directory;

export type RootDirectoryGrition = Grition<RootDirectory>;

export type RootDirectoryOdeshin = OdeshinFromGrition<RootDirectoryGrition>;

export const ROOT_DIRECTORY_GEPP = 'root-directory';

export type RootDirectoryGepp = typeof ROOT_DIRECTORY_GEPP;

export type RootDirectoryVoictent = Voictent<
  RootDirectoryGepp,
  RootDirectoryOdeshin
>;
