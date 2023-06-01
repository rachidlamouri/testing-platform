import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { Voictent } from '../../adapter/voictent';

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

export type DirectoryGepp = typeof DIRECTORY_GEPP;

export type DirectoryVoictent = Voictent<DirectoryGepp, Directory>;

export type DirectoryVoque = InMemoryOdeshin2Voque<DirectoryGepp, Directory>;
