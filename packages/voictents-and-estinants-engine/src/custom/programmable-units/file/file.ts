import { Grition } from '../../adapter/grition';
import { Voictent } from '../../../type-script-adapter/voictent';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';

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

export type FileGrition = Grition<File>;

export type FileOdeshin = OdeshinFromGrition<FileGrition>;

export const FILE_GEPP = 'file';

export type FileGepp = typeof FILE_GEPP;

export type FileVoictent = Voictent<FileGepp, FileOdeshin>;
