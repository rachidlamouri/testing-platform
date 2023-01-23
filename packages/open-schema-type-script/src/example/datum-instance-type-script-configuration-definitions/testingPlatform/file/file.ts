export enum FileTypeIdentifier {
  JSON = 'JSON',
  TypeScript = 'TypeScript',
  Unknown = 'Unknown',
}

const extensionsByFileType = {
  [FileTypeIdentifier.JSON]: '.json',
  [FileTypeIdentifier.TypeScript]: '.ts',
  [FileTypeIdentifier.Unknown]: '.:shrug:',
} satisfies Record<FileTypeIdentifier, string>;

// TODO: make a util for swapping keys and values
export const fileTypesByExtension = Object.fromEntries(
  Object.entries(extensionsByFileType).map(([k, v]) => [v, k]),
) as Record<string, FileTypeIdentifier>;

export type File<T extends FileTypeIdentifier = FileTypeIdentifier> = {
  filePath: string;
  fileTypeIdentifier: T;
};
