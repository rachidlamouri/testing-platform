import { posix } from 'path';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { getFileSystemNodePathPartList } from './getFileSystemNodePathPartList';
import { NodePathConstructorInput } from './nodePathConstructorInput';
import {
  FileExtensionSuffixIdentifier,
  getFileExtensionSuffixIdentifier,
} from '../../../package-agnostic-utilities/file/fileExtensionSuffixIdentifier';

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
      const { serialized: serializedFilePath } = input;

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
