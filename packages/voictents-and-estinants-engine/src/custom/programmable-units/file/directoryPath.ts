import { posix } from 'path';
import { assertNotUndefined } from '../../../utilities/assertNotUndefined';
import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../utilities/simplify';
import { getFileSystemNodePathPartList } from './getFileSystemNodePathPartList';

type DirectoryPathConstructorInput = {
  serialized: string;
};

type DirectoryName = {
  serialized: string;
};

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
