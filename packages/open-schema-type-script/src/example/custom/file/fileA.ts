import { Estinant } from '../../../core/estinant';
import { GeppTuple } from '../../../core/gepp';
import { TropoignantTypeName } from '../../../core/tropoignant';
import { File } from '../../../utilities/file/file';
import {
  FileExtensionSuffixIdentifier,
  getFileExtensionSuffixIdentifier,
} from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { getFileMetadata } from '../../../utilities/file/getFileMetadata';
import { getNestedFilePaths } from '../../../utilities/file/getNestedFilePaths';
import { Grition } from '../custom-constructs/grition';
import { Odeshin, ODESHIN_GEPP } from '../custom-constructs/odeshin';
import { Plifal } from '../custom-constructs/plifal';
import {
  FileAConfigurationOdeshin,
  FILE_A_CONFIGURATION_GEPP,
} from './fileAConfiguration';

export type FileA<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier = FileExtensionSuffixIdentifier,
> = Grition<File<TFileExtensionSuffixIdentifier, null>>;

export type FileAIdentifier = `file-a:${string}`;

export type FileAOdeshin<TFileA extends FileA = FileA> = Odeshin<
  FileAIdentifier,
  TFileA
>;

export const FILE_A_GEPP = 'file-a';

export type FileAGepp = typeof FILE_A_GEPP;

export type FileAPlifal<TGeppTuple extends GeppTuple = []> = Plifal<
  [FileAGepp, ...TGeppTuple],
  FileAOdeshin
>;

export type FileAPlifalTuple = readonly FileAPlifal[];

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

export const fileAEstinant: Estinant<
  FileAConfigurationOdeshin,
  FileAPlifalTuple
> = {
  inputGepp: FILE_A_CONFIGURATION_GEPP,
  tropoignant: {
    typeName: TropoignantTypeName.Onama,
    process: function buildFileA(inputOdeshin) {
      const filePaths = getNestedFilePaths(inputOdeshin.grition);

      const fileAQuirmTuple: FileAPlifalTuple = filePaths.map((filePath) => {
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
          geppTuple: [ODESHIN_GEPP, FILE_A_GEPP],
          hubblepup: {
            identifier,
            grition,
          },
        } satisfies FileAPlifal;
      });

      return fileAQuirmTuple;
    },
  },
};
