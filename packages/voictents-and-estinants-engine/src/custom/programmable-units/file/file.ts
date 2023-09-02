import { Merge } from 'type-fest';
import {
  ObjectWithPrototype,
  buildConstructorFunctionWithName,
} from '../../../utilities/buildConstructorFunction';
import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import {
  BaseFileSystemNode,
  FileSystemNodePrototype,
  getFileSystemNodePathPartList,
  getFileSystemNodeZorn,
} from './fileSystemNode';
import { FileSystemNodeVoque } from './fileSystemNodeVoictent';
import { SpreadN } from '../../../utilities/spreadN';

type FileName = {
  pascalCase: string;
  camelCase: string;
  screamingSnakeCase: string;
  kebabCase: string;
};

type FileExtensionMetadata<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier,
> = {
  /** @deprecated in favor of partList */
  parts: string[];
  partList: string[];
  suffix: string;
  suffixIdentifier: TFileExtensionSuffixIdentifier;
};

type BaseFile<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier = FileExtensionSuffixIdentifier,
  TAdditionalMetadata extends object | null = null,
> = SpreadN<
  [
    BaseFileSystemNode,
    {
      /** @deprecated in favor of zorn.forMachine  */
      instanceId: string;
      directoryPath: string;
      onDiskFileName: Merge<FileName, { asIs: string }>;
      inMemoryFileName: FileName;
      extension: FileExtensionMetadata<TFileExtensionSuffixIdentifier>;
      additionalMetadata: TAdditionalMetadata;
    },
  ]
>;

// TODO: move extension logic to a getter
type FilePrototype = SpreadN<
  [
    FileSystemNodePrototype,
    {
      get filePath(): string;
      get filePathPartList(): string[];
    },
  ]
>;

/**
 * Represents a file system file
 */
export type File<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier = FileExtensionSuffixIdentifier,
  TAdditionalMetadata extends object | null = null,
> = ObjectWithPrototype<
  BaseFile<TFileExtensionSuffixIdentifier, TAdditionalMetadata>,
  FilePrototype
>;

export const { FileInstance } = buildConstructorFunctionWithName(
  'FileInstance',
)<BaseFile, FilePrototype, File>({
  zorn: getFileSystemNodeZorn,
  nodePathPartList: getFileSystemNodePathPartList,
  filePathPartList: (file) => {
    return file.nodePathPartList;
  },
  filePath: (file) => {
    return file.nodePath;
  },
});

export const FILE_GEPP = 'file';

type FileGepp = typeof FILE_GEPP;

export type FileVoque = FileSystemNodeVoque<FileGepp, File>;
