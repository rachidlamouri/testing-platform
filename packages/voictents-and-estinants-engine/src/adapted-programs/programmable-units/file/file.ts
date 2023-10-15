import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { FileExtensionSuffixIdentifier } from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';
import { FilePath, FilePathInstance } from './filePath';
import { FileSystemNodeId } from './fileSystemNode';
import { FileSystemNodeStreamMetatype } from './fileSystemNodeCollection';

type FileConstructorInput = {
  nodePath: string;
  /**
   * @deprecated in favor of id.forMachine
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
  id: FileSystemNodeId;
  /** @deprecated in favor of id.forMachine  */
  instanceId: string;
  filePath: FilePath<TFileExtensionSuffixIdentifier>;
  nodePath: FilePath<TFileExtensionSuffixIdentifier>;
};

export const { FileInstance } = buildNamedConstructorFunction({
  constructorName: 'FileInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'instanceId',
    'filePath',
    'nodePath',
  ],
} as const)
  .withTypes<FileConstructorInput, File>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { nodePath: serializedFilePath, ...otherInputFields } = input;

      const id = new FileSystemNodeId({
        nodePath: serializedFilePath,
      });

      const filePath = new FilePathInstance({
        serialized: serializedFilePath,
      });

      return {
        id,
        filePath,
        nodePath: filePath,
        ...otherInputFields,
      } satisfies File;
    },
  })
  .assemble();

export const FILE_COLLECTION_ID = 'file';

type FileCollectionId = typeof FILE_COLLECTION_ID;

export type FileStreamMetatype = FileSystemNodeStreamMetatype<
  FileCollectionId,
  File
>;
