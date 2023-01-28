import { FileExtensionSemanticsIdentifier } from './fileExtensionSemanticsIdentifier';

const extensionsByFileExtensionSemanticsIdentifer = {
  [FileExtensionSemanticsIdentifier.Json]: '.json',
  [FileExtensionSemanticsIdentifier.TypeScript]: '.ts',
  [FileExtensionSemanticsIdentifier.Unknown]: '.:shrug:',
} satisfies Record<FileExtensionSemanticsIdentifier, string>;

// TODO: make a util for swapping keys and values
export const fileExtensionSemanticsIdentifiersByExtension = Object.fromEntries(
  Object.entries(extensionsByFileExtensionSemanticsIdentifer).map(([k, v]) => [
    v,
    k,
  ]),
) as Record<string, FileExtensionSemanticsIdentifier>;

export type File<
  TFileExtensionSemanticsIdentifier extends FileExtensionSemanticsIdentifier = FileExtensionSemanticsIdentifier,
> = {
  filePath: string;
  fileExtensionSemanticsIdentifier: TFileExtensionSemanticsIdentifier;
};
