import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { DirectoryPath, DirectoryPathInstance } from './directoryPath';
import { FileSystemNodeId } from './fileSystemNode';
import { FileSystemNodeStreamMetatype } from './fileSystemNodeCollection';

type DirectoryConstructorInput = {
  /**
   * @deprecated in favor of id.forMachine
   * @todo remove after removing typescript-file-relationship program
   */
  instanceId: string;
  nodePath: string;
};

/**
 * Represents a file system directory
 */
export type Directory = {
  id: FileSystemNodeId;
  /** @deprecated in favor of id.forMachine */
  instanceId: string;
  directoryPath: DirectoryPath;
  nodePath: DirectoryPath;
};

export const { DirectoryInstance } = buildNamedConstructorFunction({
  constructorName: 'DirectoryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'instanceId',
    'directoryPath',
    'nodePath',
  ],
} as const)
  .withTypes<DirectoryConstructorInput, Directory>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { instanceId, nodePath: serializedDirectoryPath } = input;

      const id = new FileSystemNodeId({
        nodePath: serializedDirectoryPath,
      });

      const directoryPath = new DirectoryPathInstance({
        serialized: serializedDirectoryPath,
      });

      return {
        id,
        instanceId,
        directoryPath,
        nodePath: directoryPath,
      } satisfies Directory;
    },
  })
  .assemble();

export const DIRECTORY_COLLECTION_ID = 'directory';

type DirectoryCollectionId = typeof DIRECTORY_COLLECTION_ID;

export type DirectoryStreamMetatype = FileSystemNodeStreamMetatype<
  DirectoryCollectionId,
  Directory
>;
