export enum FileSemanticsIdentifier {
  A = 'File:A',
  TypeScript = 'File:TypeScript',
  Json = 'File:Json',
  Unknown = 'File:Unknown',
}

export type FileExtensionSemanticsIdentifier = Exclude<
  FileSemanticsIdentifier,
  FileSemanticsIdentifier.A
>;

const extensionsByFileSemantics = {
  [FileSemanticsIdentifier.Json]: '.json',
  [FileSemanticsIdentifier.TypeScript]: '.ts',
  [FileSemanticsIdentifier.Unknown]: '.:shrug:',
} satisfies Record<FileExtensionSemanticsIdentifier, string>;

// TODO: make a util for swapping keys and values
export const fileSemanticsByExtension = Object.fromEntries(
  Object.entries(extensionsByFileSemantics).map(([k, v]) => [v, k]),
) as Record<string, FileExtensionSemanticsIdentifier>;

export type File<T extends FileSemanticsIdentifier = FileSemanticsIdentifier> =
  {
    filePath: string;
    fileSemanticsIdentifier: T;
  };
