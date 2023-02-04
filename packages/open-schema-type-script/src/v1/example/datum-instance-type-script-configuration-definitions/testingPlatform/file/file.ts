// Skip

import { UnknownObject } from '../../../../utilities/types/unknownHelpers';
import { FileExtensionSuffixSemanticsIdentifier } from './fileExtensionSuffixSemanticsIdentifier';

const extensionSuffixesByFileExtensionSuffixSemanticsIdentifer = {
  [FileExtensionSuffixSemanticsIdentifier.Json]: 'json',
  [FileExtensionSuffixSemanticsIdentifier.TypeScript]: 'ts',
} satisfies Record<
  Exclude<
    FileExtensionSuffixSemanticsIdentifier,
    FileExtensionSuffixSemanticsIdentifier.Unknown
  >,
  string
>;

// TODO: make a util for swapping keys and values
const fileExtensionSuffixSemanticsIdentifiersByExtensionSuffix =
  Object.fromEntries(
    Object.entries(
      extensionSuffixesByFileExtensionSuffixSemanticsIdentifer,
    ).map(([k, v]) => [v, k]),
  ) as Record<
    string,
    Exclude<
      FileExtensionSuffixSemanticsIdentifier,
      FileExtensionSuffixSemanticsIdentifier.Unknown
    >
  >;

export const getFileExtensionSuffixSemanticsIdentifier = (
  extensionSuffix: string,
): FileExtensionSuffixSemanticsIdentifier => {
  return (
    fileExtensionSuffixSemanticsIdentifiersByExtensionSuffix[extensionSuffix] ??
    FileExtensionSuffixSemanticsIdentifier.Unknown
  );
};

export type FileTypeParameter = {
  FileExtensionSuffixSemanticsIdentifier: FileExtensionSuffixSemanticsIdentifier;
  AdditionalMetadata: UnknownObject | null;
};

type FileName = {
  pascalCase: string;
  camelCase: string;
};

export type File<T extends FileTypeParameter = FileTypeParameter> = {
  filePath: string;
  onDiskFileName: FileName;
  inMemoryFileName: FileName;
  extension: {
    parts: string[];
    suffix: string;
    suffixSemanticsIdentifier: T['FileExtensionSuffixSemanticsIdentifier'];
  };
  additionalMetadata: T['AdditionalMetadata'];
};
