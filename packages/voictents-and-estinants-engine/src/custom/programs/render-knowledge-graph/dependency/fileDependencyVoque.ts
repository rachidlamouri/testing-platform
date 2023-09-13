import { InMemoryOdeshin2IndexByName } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { InMemoryVoque } from '../../../../core/engine/inMemoryVoque';
import { BoundedFile } from '../file/boundedFile';
import { FileDependency } from './fileDependency';

export const FILE_DEPENDENCY_GEPP = 'file-dependency';

type FileDependencyGepp = typeof FILE_DEPENDENCY_GEPP;

export type FileDependencyVoictentPelie = {
  importedFileListByImportingFilePath: Map<string, BoundedFile[]>;
  importingFileListByImportedFilePath: Map<string, BoundedFile[]>;
  list: FileDependency[];
};

export type FileDependencyVoque = InMemoryVoque<
  FileDependencyGepp,
  FileDependency,
  FileDependency,
  InMemoryOdeshin2IndexByName,
  FileDependencyVoictentPelie
>;
