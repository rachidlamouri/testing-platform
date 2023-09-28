import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import { DirectoryPath, DirectoryPathInstance } from './directoryPath';
import { FileSystemNodeZorn } from './fileSystemNode';
import { FileSystemNodeVoque } from './fileSystemNodeVoictent';

type DirectoryConstructorInput = {
  /**
   * @deprecated in favor of zorn.forMachine
   * @todo remove after removing typescript-file-relationship program
   */
  instanceId: string;
  nodePath: string;
};

/**
 * Represents a file system directory
 */
export type Directory = {
  zorn: FileSystemNodeZorn;
  /** @deprecated in favor of zorn.forMachine */
  instanceId: string;
  directoryPath: DirectoryPath;
  nodePath: DirectoryPath;
};

export const { DirectoryInstance } = buildNamedConstructorFunction({
  constructorName: 'DirectoryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'instanceId',
    'directoryPath',
    'nodePath',
  ],
} as const)
  .withTypes<DirectoryConstructorInput, Directory>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { instanceId, nodePath: serializedDirectoryPath } = input;

      const zorn = new FileSystemNodeZorn({
        nodePath: serializedDirectoryPath,
      });

      const directoryPath = new DirectoryPathInstance({
        serialized: serializedDirectoryPath,
      });

      return {
        zorn,
        instanceId,
        directoryPath,
        nodePath: directoryPath,
      } satisfies Directory;
    },
  })
  .assemble();

export const DIRECTORY_GEPP = 'directory';

type DirectoryGepp = typeof DIRECTORY_GEPP;

export type DirectoryVoque = FileSystemNodeVoque<DirectoryGepp, Directory>;
