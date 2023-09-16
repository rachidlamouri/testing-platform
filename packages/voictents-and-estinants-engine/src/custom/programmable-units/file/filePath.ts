import { posix } from 'path';
import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../utilities/simplify';
import { getFileMetadata } from './getFileMetadata';
import { getFileSystemNodePathPartList } from './getFileSystemNodePathPartList';
import { NodePathConstructorInput } from './nodePathConstructorInput';

type FilePathConstructorInput = NodePathConstructorInput;

type FileExtension = {
  serialized: string;
  partList: string[];
  suffix: string;
};

type FileName = {
  serialized: string;
  extensionless: string;
  extension: FileExtension;
};

export type FilePath = SimplifyN<
  [
    FilePathConstructorInput,
    {
      name: FileName;
      partList: string[];
      parentDirectoryPath: string;
    },
  ]
>;

export const { FilePathInstance } = buildNamedConstructorFunction({
  constructorName: 'FilePathInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'serialized',
    'ancestorDirectoryPathSet',
    'name',
    'partList',
    'parentDirectoryPath',
  ],
} as const)
  .withTypes<FilePathConstructorInput, FilePath>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { serialized, ancestorDirectoryPathSet } = input;

      const {
        onDiskFileName,
        extensionlessFileName,
        fullExtension,
        extensionPartList,
        extensionSuffix,
      } = getFileMetadata(serialized);

      const partList = getFileSystemNodePathPartList(serialized);

      const parentDirectoryPath = posix.dirname(serialized);

      return {
        serialized,
        ancestorDirectoryPathSet,
        name: {
          serialized: onDiskFileName,
          extensionless: extensionlessFileName,
          extension: {
            serialized: fullExtension,
            partList: extensionPartList,
            suffix: extensionSuffix,
          },
        },
        partList,
        parentDirectoryPath,
      };
    },
  })
  .assemble();