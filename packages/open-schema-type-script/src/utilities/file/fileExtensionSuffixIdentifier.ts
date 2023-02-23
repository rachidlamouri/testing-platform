import { swapEntries } from '../swapEntries';

export enum FileExtensionSuffixIdentifier {
  Html = 'HTML',
  TypeScript = 'TypeScript',
  Json = 'Json',
  TabSeparatedValues = 'TabSeparatedValues',
  Unknown = 'Unknown',
  Yaml = 'Yaml',
}

const fileExtensionSuffixesByFileExtensionSuffixIdentifer = {
  [FileExtensionSuffixIdentifier.Html]: 'html',
  [FileExtensionSuffixIdentifier.Json]: 'json',
  [FileExtensionSuffixIdentifier.TabSeparatedValues]: 'tsv',
  [FileExtensionSuffixIdentifier.TypeScript]: 'ts',
  [FileExtensionSuffixIdentifier.Yaml]: 'yaml',
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
