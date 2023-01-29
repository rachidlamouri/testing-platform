import { UnknownObject } from '../../../../utilities/types/unknownHelpers';
import { FileExtensionSuffixSemanticsIdentifier } from './fileExtensionSuffixSemanticsIdentifier';

const extensionSuffixesByFileExtensionSuffixSemanticsIdentifer = {
  [FileExtensionSuffixSemanticsIdentifier.Json]: '.json',
  [FileExtensionSuffixSemanticsIdentifier.TypeScript]: '.ts',
  [FileExtensionSuffixSemanticsIdentifier.Unknown]: '.:shrug:',
} satisfies Record<FileExtensionSuffixSemanticsIdentifier, string>;

// TODO: make a util for swapping keys and values
export const fileExtensionSuffixSemanticsIdentifiersByExtensionSuffix =
  Object.fromEntries(
    Object.entries(
      extensionSuffixesByFileExtensionSuffixSemanticsIdentifer,
    ).map(([k, v]) => [v, k]),
  ) as Record<string, FileExtensionSuffixSemanticsIdentifier>;

export type FileTypeParameter = {
  FileExtensionSuffixSemanticsIdentifier: FileExtensionSuffixSemanticsIdentifier;
  AdditionalMetadata: UnknownObject | null;
};

export type File<T extends FileTypeParameter = FileTypeParameter> = {
  filePath: string;
  fileName: {
    pascalCase: string;
    camelCase: string;
  };
  extensionSuffix: {
    value: string;
    semanticsIdentifier: T['FileExtensionSuffixSemanticsIdentifier'];
  };
  additionalMetadata: T['AdditionalMetadata'];
};
