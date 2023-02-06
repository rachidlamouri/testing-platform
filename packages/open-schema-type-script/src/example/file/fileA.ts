import { Estinant } from '../../core/estinant';
import { Quirm, QuirmTuple } from '../../core/quirm';
import { File } from '../../utilities/file/file';
import {
  FileExtensionSuffixIdentifier,
  getFileExtensionSuffixIdentifier,
} from '../../utilities/file/fileExtensionSuffixIdentifier';
import { getFileMetadata } from '../../utilities/file/getFileMetadata';
import { getNestedFilePaths } from '../../utilities/file/getNestedFilePaths';
import { JsonNull } from '../../utilities/json';
import {
  FileAConfiguration,
  FILE_A_CONFIGURATION_GIPP,
} from './fileAConfiguration';

export type FileA = File<FileExtensionSuffixIdentifier, JsonNull>;

const partsToCamel = (x: string[]): string => {
  return x
    .map((word, index) => {
      if (index === 0) {
        return word;
      }

      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    })
    .join('');
};

const partsToPascal = (x: string[]): string => {
  return x
    .map((word) => {
      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    })
    .join('');
};

export const FILE_A_GIPP = 'file-a';

export const fileAEstinant: Estinant<FileAConfiguration, QuirmTuple<FileA>> = {
  inputGipp: FILE_A_CONFIGURATION_GIPP,
  tropoignant: function buildFileA(fileAConfiguration) {
    const filePaths = getNestedFilePaths(fileAConfiguration);

    const fileAQuirmTuple: QuirmTuple<FileA> = filePaths.map((filePath) => {
      const {
        onDiskFileNameParts,
        inMemoryFileNameParts,
        extensionSuffix,
        extensionParts,
      } = getFileMetadata(filePath);

      const hubblepup: FileA = {
        filePath,
        onDiskFileName: {
          camelCase: partsToCamel(onDiskFileNameParts),
          pascalCase: partsToPascal(onDiskFileNameParts),
        },
        inMemoryFileName: {
          camelCase: partsToCamel(inMemoryFileNameParts),
          pascalCase: partsToPascal(inMemoryFileNameParts),
        },
        extension: {
          parts: extensionParts,
          suffix: extensionSuffix,
          suffixIdentifier: getFileExtensionSuffixIdentifier(extensionSuffix),
        },
        additionalMetadata: null,
      };

      return {
        gippTuple: [FILE_A_GIPP],
        hubblepup,
      } satisfies Quirm<FileA>;
    });

    return fileAQuirmTuple;
  },
};
