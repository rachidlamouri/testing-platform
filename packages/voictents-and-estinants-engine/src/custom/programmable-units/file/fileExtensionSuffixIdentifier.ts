import { swapEntries } from '../../../utilities/swapEntries';

export enum FileExtensionSuffixIdentifier {
  Html = 'Html',
  Json = 'Json',
  TabSeparatedValue = 'TabSeparatedValue',
  TypeScript = 'TypeScript',
  Yaml = 'Yaml',

  Unknown = 'Unknown',
}

const fileExtensionSuffixesByFileExtensionSuffixIdentifer = {
  [FileExtensionSuffixIdentifier.Html]: 'html',
  [FileExtensionSuffixIdentifier.Json]: 'json',
  [FileExtensionSuffixIdentifier.TabSeparatedValue]: 'tsv',
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
