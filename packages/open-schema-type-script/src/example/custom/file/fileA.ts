import { Estinant2 } from '../../../core/estinant';
import { GeppTuple } from '../../../core/gepp';
import { Tropoignant2 } from '../../../core/tropoignant';
import { File } from '../../../utilities/file/file';
import {
  FileExtensionSuffixIdentifier,
  getFileExtensionSuffixIdentifier,
} from '../../../utilities/file/fileExtensionSuffixIdentifier';
import { getFileMetadata } from '../../../utilities/file/getFileMetadata';
import { getNestedFilePaths } from '../../../utilities/file/getNestedFilePaths';
import { Grition } from '../../../custom-adapter/grition';
import { Odeshin } from '../../../custom-adapter/odeshin';
import { Plifal } from '../../../custom-adapter/plifal';
import {
  FileAConfigurationPlifal,
  FILE_A_CONFIGURATION_GEPP,
} from './fileAConfiguration';
import { kodatar } from '../../../type-script-adapter/kodataring';

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

export type BaseFileAPlifal<
  TGeppTuple extends GeppTuple,
  TFileAOdeshin extends FileAOdeshin,
> = Plifal<TGeppTuple, TFileAOdeshin>;

export type FileAPlifal = BaseFileAPlifal<[FileAGepp], FileAOdeshin>;

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

type InputPlifalTuple = [FileAConfigurationPlifal];
type OutputPlifalTuple = FileAPlifalTuple;

const buildFileA: Tropoignant2<InputPlifalTuple, OutputPlifalTuple> = (
  input,
) => {
  const filePaths = getNestedFilePaths(input.hubblepup.grition);

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
      geppTuple: [FILE_A_GEPP],
      hubblepup: {
        identifier,
        grition,
      },
    } satisfies FileAPlifal;
  });

  return fileAQuirmTuple;
};

export const fileAEstinant: Estinant2<InputPlifalTuple, OutputPlifalTuple> = {
  inputGeppTuple: [FILE_A_CONFIGURATION_GEPP],
  croard: kodatar,
  tropoig: buildFileA,
};
