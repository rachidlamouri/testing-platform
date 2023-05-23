import { Voictent } from '../../../type-script-adapter/voictent';
import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';
import { InMemoryOdeshin2Voque } from '../../../core/engine/inMemoryOdeshinVoictent2';

export type FileName = {
  pascalCase: string;
  camelCase: string;
  screamingSnakeCase: string;
  kebabCase: string;
};

export type File<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier = FileExtensionSuffixIdentifier,
  TAdditionalMetadata extends object | null = null,
> = {
  zorn: string;
  instanceId: string;
  filePath: string;
  directoryPath: string;
  onDiskFileName: FileName;
  inMemoryFileName: FileName;
  extension: {
    parts: string[];
    suffix: string;
    suffixIdentifier: TFileExtensionSuffixIdentifier;
  };
  additionalMetadata: TAdditionalMetadata;
};

export const FILE_GEPP = 'file';

export type FileGepp = typeof FILE_GEPP;

export type FileVoictent = Voictent<FileGepp, File>;

export type FileVoque = InMemoryOdeshin2Voque<FileGepp, File>;
