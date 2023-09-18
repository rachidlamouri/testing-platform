import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import { FilePath, FilePathInstance } from './filePath';
import { FileSystemNodeZorn } from './fileSystemNode';
import { FileSystemNodeVoque } from './fileSystemNodeVoictent';

type FileConstructorInput = {
  nodePath: string;
  /** @deprecated in favor of zorn.forMachine  */
  instanceId: string;
  ancestorDirectoryPathSet: string[];
  additionalMetadata: null;
};

// TODO: separate "File" and GenericFile;

/**
 * Represents a file system file
 */
export type File<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier = FileExtensionSuffixIdentifier,
> = {
  zorn: FileSystemNodeZorn;
  /** @deprecated in favor of zorn.forMachine  */
  instanceId: string;
  /** @deprecated in favor of a nodePath.parentDirectoryPath */
  directoryPath: string;
  filePath: string;
  nodePath: FilePath<TFileExtensionSuffixIdentifier>;
};

export const { FileInstance } = buildNamedConstructorFunction({
  constructorName: 'FileInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'instanceId',
    'directoryPath',
    'filePath',
    'nodePath',
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
