import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { DirectoryPath, DirectoryPathInstance } from './directoryPath';
import { FileSystemNodeZorn } from './fileSystemNode';
import { FileSystemNodeVoque } from './fileSystemNodeVoictent';

type DirectoryConstructorInput = {
  /** @deprecated in favor of zorn.forMachine  */
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
  nodePath: DirectoryPath;
  /** @deprecated in favor of nodePath.parentDirectoryPath */
  parentDirectoryPath: string;
  /** @deprecated in favor of nodePath.name.serialized */
  directoryName: string;
  /**
   *  @deprecated in favor of nodePath
   *  @todo convert this to type DirectoryPath
   */
  directoryPath: string;
  /** @deprecated in favor of nodePath.partList */
  directoryPathPartList: string[];
};

export const { DirectoryInstance } = buildNamedConstructorFunction({
  constructorName: 'DirectoryInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'instanceId',
    'directoryPath',
    'nodePath',
    'parentDirectoryPath',
    'directoryPathPartList',
    'directoryName',
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
        directoryPath: serializedDirectoryPath,
        nodePath: directoryPath,
        parentDirectoryPath: directoryPath.parentDirectoryPath,
        directoryPathPartList: directoryPath.partList,
        directoryName: directoryPath.name.serialized,
      };
    },
  })
  .assemble();

export const DIRECTORY_GEPP = 'directory';

type DirectoryGepp = typeof DIRECTORY_GEPP;

export type DirectoryVoque = FileSystemNodeVoque<DirectoryGepp, Directory>;
