import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';

/**
 * Represents a file system directory
 */
export type Directory = {
  zorn: string;
  instanceId: string;
  directoryName: string;
  directoryPath: string;
  directoryPathPartList: string[];
};

export const DIRECTORY_GEPP = 'directory';

type DirectoryGepp = typeof DIRECTORY_GEPP;

export type DirectoryVoque = InMemoryOdeshin2Voque<DirectoryGepp, Directory>;
