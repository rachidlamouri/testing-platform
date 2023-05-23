import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';
import { Directory } from '../file/directory';

export type RootDirectory = Directory;

export const ROOT_DIRECTORY_GEPP = 'root-directory';

export type RootDirectoryGepp = typeof ROOT_DIRECTORY_GEPP;

export type RootDirectoryVoictent = Voictent<RootDirectoryGepp, RootDirectory>;

export type RootDirectoryVoque = InMemoryOdeshin2Voque<
  RootDirectoryGepp,
  RootDirectory
>;
