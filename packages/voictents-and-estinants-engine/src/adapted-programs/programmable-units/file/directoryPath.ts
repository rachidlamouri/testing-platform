import { posix } from 'path';
import { assertNotUndefined } from '../../../package-agnostic-utilities/nil/assertNotUndefined';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { getFileSystemNodePathPartList } from './getFileSystemNodePathPartList';
import { NodePathConstructorInput } from './nodePathConstructorInput';

type DirectoryPathConstructorInput = NodePathConstructorInput;

type DirectoryName = {
  serialized: string;
};

/**
 * An object that encapsulates various aspects of a directory's location within a
 * file system
 */
export type DirectoryPath = SimplifyN<
  [
    DirectoryPathConstructorInput,
    {
      name: DirectoryName;
      parentDirectoryPath: string;
      partList: string[];
    },
  ]
>;

export const { DirectoryPathInstance } = buildNamedConstructorFunction({
  constructorName: 'DirectoryPathInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'serialized',
    'name',
    'parentDirectoryPath',
    'partList',
  ],
} as const)
  .withTypes<DirectoryPathConstructorInput, DirectoryPath>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { serialized } = input;

      const partList = getFileSystemNodePathPartList(serialized);
      const directoryName = partList[partList.length - 1];
      assertNotUndefined(directoryName);

      const parentDirectoryPath = posix.dirname(serialized);

      return {
        serialized,
        name: {
          serialized: directoryName,
        },
        parentDirectoryPath,
        partList,
      };
    },
  })
  .assemble();
