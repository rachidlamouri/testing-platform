import { swapEntries } from '../../../utilities/swapEntries';

export enum FileExtensionSuffixIdentifier {
  Bash = 'Bash',
  Html = 'Html',
  Json = 'Json',
  Text = 'Text',
  TypeScript = 'TypeScript',
  Yaml = 'Yaml',

  Unknown = 'Unknown',
}

export type KnownFileExtensionSuffixIdentifier = Exclude<
  FileExtensionSuffixIdentifier,
  FileExtensionSuffixIdentifier.Unknown
>;

type FileExtensionSuffixByFileExtensionSuffixIdentifer = Record<
  KnownFileExtensionSuffixIdentifier,
  string
>;

const fileExtensionSuffixByFileExtensionSuffixIdentifer = {
  [FileExtensionSuffixIdentifier.Bash]: 'sh',
  [FileExtensionSuffixIdentifier.Html]: 'html',
  [FileExtensionSuffixIdentifier.Json]: 'json',
  [FileExtensionSuffixIdentifier.Text]: 'txt',
  [FileExtensionSuffixIdentifier.TypeScript]: 'ts',
  [FileExtensionSuffixIdentifier.Yaml]: 'yaml',
} satisfies FileExtensionSuffixByFileExtensionSuffixIdentifer;

const fileExtensionSuffixIdentifiersByFileExtensionSuffix = swapEntries(
  fileExtensionSuffixByFileExtensionSuffixIdentifer,
);

export const getFileExtensionSuffixIdentifier = (
  extensionSuffix: string,
): FileExtensionSuffixIdentifier => {
  return (
    fileExtensionSuffixIdentifiersByFileExtensionSuffix[extensionSuffix] ??
    FileExtensionSuffixIdentifier.Unknown
  );
};

export const getFileExtensionSuffix = (
  extensionSuffixIdentifier: KnownFileExtensionSuffixIdentifier,
): string => {
  return fileExtensionSuffixByFileExtensionSuffixIdentifer[
    extensionSuffixIdentifier
  ];
};
