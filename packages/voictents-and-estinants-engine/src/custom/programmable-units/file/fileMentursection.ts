import { buildMentursection } from '../../../type-script-adapter/estinant/mentursection';
import { getNestedFilePaths } from '../../../utilities/file/getNestedFilePaths';
import { FileVoictent, FILE_GEPP, FileOdeshin, FileGrition } from './file';
import { getFileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import {
  FileMentursectionConfigurationVoictent,
  FILE_MENTURSECTION_CONFIGURATION_GEPP,
} from './fileMentursectionConfiguration';
import { getFileMetadata } from './getFileMetadata';

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

export const fileMentursection = buildMentursection<
  FileMentursectionConfigurationVoictent,
  [FileVoictent]
>({
  inputGepp: FILE_MENTURSECTION_CONFIGURATION_GEPP,
  outputGeppTuple: [FILE_GEPP],
  pinbe: (input) => {
    const filePaths = getNestedFilePaths(input);

    const fileAOdeshinTuple = filePaths.map<FileOdeshin>((filePath) => {
      const {
        onDiskFileNameParts,
        inMemoryFileNameParts,
        extensionSuffix,
        extensionParts,
      } = getFileMetadata(filePath);

      const grition: FileGrition = {
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
      [FILE_GEPP]: fileAOdeshinTuple,
    };
  },
});
