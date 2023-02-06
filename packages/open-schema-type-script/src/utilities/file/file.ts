import { JsonNull, JsonObject } from '../json';
import { FileExtensionSuffixIdentifier } from './fileExtensionSuffixIdentifier';

export type FileName = {
  pascalCase: string;
  camelCase: string;
};

export type File<
  TFileExtensionSuffixIdentifier extends FileExtensionSuffixIdentifier,
  TAdditionalMetadata extends JsonObject | JsonNull,
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
