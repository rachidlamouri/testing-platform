import { swapEntries } from '../object/swapEntries';

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

type FileExtensionSuffixByFileExtensionSuffixIdentifer = Record<
  KnownFileExtensionSuffixIdentifier,
  string
>;

const fileExtensionSuffixByFileExtensionSuffixIdentifer = {
  [FileExtensionSuffixIdentifier.Bash]: 'sh',
  [FileExtensionSuffixIdentifier.Gitignore]: 'gitignore',
  [FileExtensionSuffixIdentifier.Html]: 'html',
  [FileExtensionSuffixIdentifier.Json]: 'json',
  [FileExtensionSuffixIdentifier.Text]: 'txt',
  [FileExtensionSuffixIdentifier.TypeScript]: 'ts',
  [FileExtensionSuffixIdentifier.TypeScriptXml]: 'tsx',
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
