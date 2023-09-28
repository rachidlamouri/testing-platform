import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FilePath, FilePathInstance } from './filePath';
import { FileSystemNodeZorn } from './fileSystemNode';
import { FileSystemNodeVoque } from './fileSystemNodeVoictent';

type FileConstructorInput = {
  nodePath: string;
  /**
   * @deprecated in favor of zorn.forMachine
   * @todo remove after removing typescript-file-relationship program
   */
  instanceId: string;
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
  filePath: FilePath<TFileExtensionSuffixIdentifier>;
  nodePath: FilePath<TFileExtensionSuffixIdentifier>;
};

export const { FileInstance } = buildNamedConstructorFunction({
  constructorName: 'FileInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'instanceId',
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
      const { nodePath: serializedFilePath, ...otherInputFields } = input;

      const zorn = new FileSystemNodeZorn({
        nodePath: serializedFilePath,
      });

      const filePath = new FilePathInstance({
        serialized: serializedFilePath,
      });

      return {
        zorn,
        filePath,
        nodePath: filePath,
        ...otherInputFields,
      } satisfies File;
    },
  })
  .assemble();

export const FILE_GEPP = 'file';

type FileGepp = typeof FILE_GEPP;

export type FileVoque = FileSystemNodeVoque<FileGepp, File>;
