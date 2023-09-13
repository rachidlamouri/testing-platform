import { Merge } from 'type-fest';
import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import { FilePath, FilePathInstance } from './filePath';
import { FileSystemNodeZorn } from './fileSystemNode';
import { FileSystemNodeVoque } from './fileSystemNodeVoictent';

type FileName = {
  pascalCase: string;
  camelCase: string;
  screamingSnakeCase: string;
  kebabCase: string;
};

type FileExtensionMetadata<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier,
> = {
  /** @deprecated in favor of nodePath.partList */
  parts: string[];
  /** @deprecated in favor of nodePath.partList */
  partList: string[];
  /** @deprecated in favor of a nodePath property */
  suffix: string;
  /** @deprecated in favor of a nodePath property */
  suffixIdentifier: TFileExtensionSuffixIdentifier;
};

type FileConstructorInput = {
  nodePath: string;
  // TODO: update some of these fields to be derived in this file
  /** @deprecated in favor of zorn.forMachine  */
  instanceId: string;
  ancestorDirectoryPathSet: string[];
  onDiskFileName: Merge<FileName, { asIs: string }>;
  inMemoryFileName: FileName;
  extension: FileExtensionMetadata<FileExtensionSuffixIdentifier>;
  additionalMetadata: null;
};

// TODO: separate "File" and GenericFile;

/**
 * Represents a file system file
 */
export type File<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier = FileExtensionSuffixIdentifier,
  TAdditionalMetadata extends object | null = null,
> = {
  zorn: FileSystemNodeZorn;
  /** @deprecated in favor of zorn.forMachine  */
  instanceId: string;
  /** @deprecated in favor of a nodePath.parentDirectoryPath */
  directoryPath: string;
  onDiskFileName: Merge<FileName, { asIs: string }>;
  inMemoryFileName: FileName;
  extension: FileExtensionMetadata<TFileExtensionSuffixIdentifier>;
  additionalMetadata: TAdditionalMetadata;
  filePath: string;
  nodePath: FilePath;
};

export const { FileInstance } = buildNamedConstructorFunction({
  constructorName: 'FileInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'instanceId',
    'onDiskFileName',
    'inMemoryFileName',
    'extension',
    'additionalMetadata',
    'instanceId',
    'directoryPath',
    'filePath',
    'nodePath',
    'onDiskFileName',
    'inMemoryFileName',
    'extension',
    'additionalMetadata',
  ],
} as const)
  .withTypes<FileConstructorInput, File>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const {
        nodePath: serializedFilePath,
        ancestorDirectoryPathSet,
        ...otherInputFields
      } = input;

      const zorn = new FileSystemNodeZorn({
        nodePath: serializedFilePath,
      });

      const filePath = new FilePathInstance({
        serialized: serializedFilePath,
        ancestorDirectoryPathSet,
      });

      return {
        zorn,
        filePath: serializedFilePath,
        nodePath: filePath,
        directoryPath: filePath.parentDirectoryPath,
        ...otherInputFields,
      };
    },
  })
  .assemble();

export const FILE_GEPP = 'file';

type FileGepp = typeof FILE_GEPP;

export type FileVoque = FileSystemNodeVoque<FileGepp, File>;
