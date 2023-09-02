import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { SpreadN } from '../../../utilities/spreadN';
import {
  BaseFileSystemNode,
  FileSystemNodePrototype,
  getFileSystemNodePathPartList,
  getFileSystemNodeZorn,
} from './fileSystemNode';
import { FileSystemNodeVoque } from './fileSystemNodeVoictent';

type BaseDirectory = SpreadN<
  [
    BaseFileSystemNode,
    {
      /** @deprecated in favor of zorn.forMachine  */
      /** @deprecated in favor of zorn.forMachine */
      instanceId: string;
      nodePath: string;
      parentDirectoryPath: string;
    },
  ]
>;

type DirectoryPrototype = SpreadN<
  [
    FileSystemNodePrototype,
    {
      get directoryName(): string;
      get directoryPath(): string;
      get directoryPathPartList(): string[];
    },
  ]
>;

/**
 * Represents a file system directory
 */
export type Directory = ObjectWithPrototype<BaseDirectory, DirectoryPrototype>;

export const { DirectoryInstance } = buildConstructorFunctionWithName(
  'DirectoryInstance',
)<BaseDirectory, DirectoryPrototype, Directory>({
  zorn: getFileSystemNodeZorn,
  nodePathPartList: getFileSystemNodePathPartList,
  directoryPath: (directory) => {
    return directory.nodePath;
  },
  directoryPathPartList: (directory) => {
    return directory.nodePathPartList;
  },
  directoryName: (directory) => {
    return directory.nodePathPartList[directory.nodePathPartList.length - 1];
  },
});

export const DIRECTORY_GEPP = 'directory';

type DirectoryGepp = typeof DIRECTORY_GEPP;

export type DirectoryVoque = FileSystemNodeVoque<DirectoryGepp, Directory>;
