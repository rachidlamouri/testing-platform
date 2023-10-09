import { swapEntries } from '../object/swapEntries';

/**
 * An enum used to distinguish file types. Is this the best way to do this? No.
 * Does it work. Sorta.
 */
export enum FileExtensionSuffixIdentifier {
  Bash = 'Bash',
  Gitignore = 'Gitignore',
  Html = 'Html',
  Json = 'Json',
  Text = 'Text',
  TypeScript = 'TypeScript',
  TypeScriptXml = 'TypeScriptXml',
  Yaml = 'Yaml',

  Unknown = 'Unknown',
}

export type KnownFileExtensionSuffixIdentifier = Exclude<
  FileExtensionSuffixIdentifier,
  FileExtensionSuffixIdentifier.Unknown
>;

type FileExtensionSuffixByFileExtensionSuffixIdentifier = Record<
  KnownFileExtensionSuffixIdentifier,
  string
>;

const fileExtensionSuffixByFileExtensionSuffixIdentifier = {
  [FileExtensionSuffixIdentifier.Bash]: 'sh',
  [FileExtensionSuffixIdentifier.Gitignore]: 'gitignore',
  [FileExtensionSuffixIdentifier.Html]: 'html',
  [FileExtensionSuffixIdentifier.Json]: 'json',
  [FileExtensionSuffixIdentifier.Text]: 'txt',
  [FileExtensionSuffixIdentifier.TypeScript]: 'ts',
  [FileExtensionSuffixIdentifier.TypeScriptXml]: 'tsx',
  [FileExtensionSuffixIdentifier.Yaml]: 'yaml',
} satisfies FileExtensionSuffixByFileExtensionSuffixIdentifier;

const fileExtensionSuffixIdentifiersByFileExtensionSuffix = swapEntries(
  fileExtensionSuffixByFileExtensionSuffixIdentifier,
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
  return fileExtensionSuffixByFileExtensionSuffixIdentifier[
    extensionSuffixIdentifier
  ];
};
