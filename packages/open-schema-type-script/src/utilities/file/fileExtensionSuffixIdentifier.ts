import { swapEntries } from '../swapEntries';

export enum FileExtensionSuffixIdentifier {
  TypeScript = 'TypeScript',
  Json = 'Json',
  Unknown = 'Unknown',
}

const fileExtensionSuffixesByFileExtensionSuffixIdentifer = {
  [FileExtensionSuffixIdentifier.Json]: 'json',
  [FileExtensionSuffixIdentifier.TypeScript]: 'ts',
} satisfies Record<
  Exclude<FileExtensionSuffixIdentifier, FileExtensionSuffixIdentifier.Unknown>,
  string
>;

const fileExtensionSuffixIdentifiersByFileExtensionSuffix = swapEntries(
  fileExtensionSuffixesByFileExtensionSuffixIdentifer,
);

export const getFileExtensionSuffixIdentifier = (
  extensionSuffix: string,
): FileExtensionSuffixIdentifier => {
  return (
    fileExtensionSuffixIdentifiersByFileExtensionSuffix[extensionSuffix] ??
    FileExtensionSuffixIdentifier.Unknown
  );
};
