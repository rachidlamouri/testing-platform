import { InMemoryOdeshin2Voque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { Directory } from '../../../programmable-units/file/directory';

/**
 * A directory with a TypeScript file
 */
export type DirectoryWithFile = Directory;

export const DIRECTORY_WITH_FILE_GEPP = 'directory-with-file';

export type DirectoryWithFileGepp = typeof DIRECTORY_WITH_FILE_GEPP;

export type DirectoryWithFileVoque = InMemoryOdeshin2Voque<
  DirectoryWithFileGepp,
  DirectoryWithFile
>;
