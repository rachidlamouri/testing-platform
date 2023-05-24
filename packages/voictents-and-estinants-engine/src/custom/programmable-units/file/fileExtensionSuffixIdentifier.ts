import { swapEntries } from '../../../utilities/swapEntries';

export enum FileExtensionSuffixIdentifier {
  Bash = 'Bash',
  Html = 'Html',
  Json = 'Json',
  TypeScript = 'TypeScript',
  Yaml = 'Yaml',

  Unknown = 'Unknown',
}

const fileExtensionSuffixesByFileExtensionSuffixIdentifer = {
  [FileExtensionSuffixIdentifier.Bash]: 'sh',
  [FileExtensionSuffixIdentifier.Html]: 'html',
  [FileExtensionSuffixIdentifier.Json]: 'json',
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
