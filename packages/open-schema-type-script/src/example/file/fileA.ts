import { Estinant } from '../../core/estinant';
import { Quirm, QuirmTuple } from '../../core/quirm';
import { TropoignantTypeName } from '../../core/tropoignant';
import { File } from '../../utilities/file/file';
import {
  FileExtensionSuffixIdentifier,
  getFileExtensionSuffixIdentifier,
} from '../../utilities/file/fileExtensionSuffixIdentifier';
import { getFileMetadata } from '../../utilities/file/getFileMetadata';
import { getNestedFilePaths } from '../../utilities/file/getNestedFilePaths';
import { Grition } from '../core/grition';
import { Odeshin } from '../core/odeshin';
import {
  FileAConfigurationOdeshin,
  FILE_A_CONFIGURATION_GEPP,
} from './fileAConfiguration';

export type FileA = Grition<File<FileExtensionSuffixIdentifier, null>>;

export type FileAIdentifier = `file-a:${string}`;

export type FileAOdeshin = Odeshin<FileAIdentifier, FileA>;

export type FileAQuirm = Quirm<FileAOdeshin>;

export type FileAQuirmTuple = QuirmTuple<FileAOdeshin>;

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

export const FILE_A_GEPP = 'file-a';

export const fileAEstinant: Estinant<
  FileAConfigurationOdeshin,
  FileAQuirmTuple
> = {
  inputGepp: FILE_A_CONFIGURATION_GEPP,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function buildFileA(inputOdeshin) {
      const filePaths = getNestedFilePaths(inputOdeshin.grition);

      const fileAQuirmTuple: FileAQuirmTuple = filePaths.map((filePath) => {
        const {
          onDiskFileNameParts,
          inMemoryFileNameParts,
          extensionSuffix,
          extensionParts,
        } = getFileMetadata(filePath);

        const grition: FileA = {
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

        const identifier: FileAIdentifier = `file-a:${filePath}`;

        return {
          geppTuple: [FILE_A_GEPP],
          hubblepup: {
            identifier,
            grition,
          },
        } satisfies FileAQuirm;
      });

      return fileAQuirmTuple;
    },
  },
};
