import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';

export type FilePath = string;

export type FileName = {
  pascalCase: string;
  camelCase: string;
  screamingSnakeCase: string;
  kebabCase: string;
};

export type File<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier,
  TAdditionalMetadata extends object | null,
> = {
  filePath: string;
  onDiskFileName: FileName;
  inMemoryFileName: FileName;
  extension: {
    parts: string[];
    suffix: string;
    suffixIdentifier: TFileExtensionSuffixIdentifier;
  };
  additionalMetadata: TAdditionalMetadata;
};
