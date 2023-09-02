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
import { FileName } from './file';

type File2ExtensionMetadata<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier,
> = {
  /** @deprecated in favor of partList */
  parts: string[];
  partList: string[];
  suffix: string;
  suffixIdentifier: TFileExtensionSuffixIdentifier;
};

type BaseFile2<
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
      extension: File2ExtensionMetadata<TFileExtensionSuffixIdentifier>;
      additionalMetadata: TAdditionalMetadata;
    },
  ]
>;

// TODO: move extension logic to a getter
type File2Prototype = FileSystemNodePrototype;

/**
 * Represents a file system file
 */
export type File2<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier = FileExtensionSuffixIdentifier,
  TAdditionalMetadata extends object | null = null,
> = ObjectWithPrototype<
  BaseFile2<TFileExtensionSuffixIdentifier, TAdditionalMetadata>,
  File2Prototype
>;

export const { File2Instance } = buildConstructorFunctionWithName(
  'File2Instance',
)<BaseFile2, File2Prototype, File2>({
  zorn: getFileSystemNodeZorn,
  filePathPartList: getFileSystemNodePathPartList,
});

export const FILE_2_GEPP = 'file-2';

type File2Gepp = typeof FILE_2_GEPP;

export type File2Voque = FileSystemNodeVoque<File2Gepp, File2>;
