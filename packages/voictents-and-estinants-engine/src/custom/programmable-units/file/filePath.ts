import { posix } from 'path';
import { buildNamedConstructorFunction } from '../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../utilities/simplify';
import { getFileSystemNodePathPartList } from './getFileSystemNodePathPartList';
import { NodePathConstructorInput } from './nodePathConstructorInput';
import {
  FileExtensionSuffixIdentifier,
  getFileExtensionSuffixIdentifier,
} from './fileExtensionSuffixIdentifier';

type FilePathConstructorInput = NodePathConstructorInput;

type FileExtension<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier,
> = {
  serialized: string;
  suffix: string;
  suffixIdentifier: TFileExtensionSuffixIdentifier;
};

type GenericFileExtension = FileExtension<FileExtensionSuffixIdentifier>;

type FileName<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier,
> = {
  serialized: string;
  extensionless: string;
  extension: FileExtension<TFileExtensionSuffixIdentifier>;
};

type GenericFileName = FileName<FileExtensionSuffixIdentifier>;

export type FilePath<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier = FileExtensionSuffixIdentifier,
> = SimplifyN<
  [
    FilePathConstructorInput,
    {
      name: FileName<TFileExtensionSuffixIdentifier>;
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
      const { serialized: serializedFilePath, ancestorDirectoryPathSet } =
        input;

      const { base: serializedOnDiskName } = posix.parse(serializedFilePath);

      const [extensionlessOnDiskName, ...extensionPartList] =
        serializedOnDiskName.split('.');

      const extensionSuffix: string =
        extensionPartList[extensionPartList.length - 1];

      const serializedExtension = extensionPartList.join('.');

      const pathPartList = getFileSystemNodePathPartList(serializedFilePath);

      const parentDirectoryPath = posix.dirname(serializedFilePath);

      return {
        serialized: serializedFilePath,
        ancestorDirectoryPathSet,
        name: {
          serialized: serializedOnDiskName,
          extensionless: extensionlessOnDiskName,
          extension: {
            serialized: serializedExtension,
            suffix: extensionSuffix,
            suffixIdentifier: getFileExtensionSuffixIdentifier(extensionSuffix),
          } satisfies GenericFileExtension,
        } satisfies GenericFileName,
        partList: pathPartList,
        parentDirectoryPath,
      } satisfies FilePath;
    },
  })
  .assemble();
