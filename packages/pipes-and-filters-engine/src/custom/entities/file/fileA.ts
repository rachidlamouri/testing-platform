import { File, FilePath } from '../../../utilities/file/file';
import {
  FileExtensionSuffixIdentifier,
  getFileExtensionSuffixIdentifier,
} from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { getFileMetadata } from '../../../utilities/file/getFileMetadata';
import { getNestedFilePaths } from '../../../utilities/file/getNestedFilePaths';
import {
  FileAConfigurationVoictent,
  FILE_A_CONFIGURATION_GEPP,
} from './fileAConfiguration';
import { Grition } from '../../adapter/grition';
import { Odeshin } from '../../adapter/odeshin';
import { Voictent } from '../../../type-script-adapter/voictent';
import { buildMentursection } from '../../../type-script-adapter/estinant/mentursection';

export type FileA<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier = FileExtensionSuffixIdentifier,
> = File<TFileExtensionSuffixIdentifier, null>;

export type FileAGrition = Grition<FileA>;

export type FileAIdentifier = FilePath;

export type FileAOdeshin = Odeshin<FileAIdentifier, FileAGrition>;

export const FILE_A_GEPP = 'file-a';

export type FileAGepp = typeof FILE_A_GEPP;

export type FileAVoictent = Voictent<FileAGepp, FileAOdeshin>;

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

const partsToScreamingSnake = (x: string[]): string => {
  return x
    .map((word) => {
      return word.toUpperCase();
    })
    .join('_');
};

const partsToKebabCase = (x: string[]): string => {
  return x.join('-');
};

export const fileAEstinant = buildMentursection<
  FileAConfigurationVoictent,
  [FileAVoictent]
>({
  inputGepp: FILE_A_CONFIGURATION_GEPP,
  outputGeppTuple: [FILE_A_GEPP],
  pinbe: (input) => {
    const filePaths = getNestedFilePaths(input);

    const fileAOdeshinTuple = filePaths.map<FileAOdeshin>((filePath) => {
      const {
        onDiskFileNameParts,
        inMemoryFileNameParts,
        extensionSuffix,
        extensionParts,
      } = getFileMetadata(filePath);

      const grition: FileAGrition = {
        filePath,
        onDiskFileName: {
          camelCase: partsToCamel(onDiskFileNameParts),
          pascalCase: partsToPascal(onDiskFileNameParts),
          screamingSnakeCase: partsToScreamingSnake(onDiskFileNameParts),
          kebabCase: partsToKebabCase(onDiskFileNameParts),
        },
        inMemoryFileName: {
          camelCase: partsToCamel(inMemoryFileNameParts),
          pascalCase: partsToPascal(inMemoryFileNameParts),
          screamingSnakeCase: partsToScreamingSnake(inMemoryFileNameParts),
          kebabCase: partsToKebabCase(inMemoryFileNameParts),
        },
        extension: {
          parts: extensionParts,
          suffix: extensionSuffix,
          suffixIdentifier: getFileExtensionSuffixIdentifier(extensionSuffix),
        },
        additionalMetadata: null,
      };

      return {
        identifier: filePath,
        grition,
      };
    });

    return {
      [FILE_A_GEPP]: fileAOdeshinTuple,
    };
  },
});
