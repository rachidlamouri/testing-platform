import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { Directory } from '../file/directory';

/**
 * The directory whose filepath is the greatest common prefix of all directories
 */
type RootDirectory = Directory;

export const ROOT_DIRECTORY_GEPP = 'root-directory';

type RootDirectoryGepp = typeof ROOT_DIRECTORY_GEPP;

export type RootDirectoryVoque = InMemoryOdeshin2ListVoque<
  RootDirectoryGepp,
  RootDirectory
>;
