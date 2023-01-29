import { UnknownObject } from '../../../../utilities/types/unknownHelpers';
import { FileExtensionSemanticsIdentifier } from './fileExtensionSuffixSemanticsIdentifier';

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

export type FileTypeParameter = {
  FileExtensionSemanticsIdentifier: FileExtensionSemanticsIdentifier;
  AdditionalMetadata: UnknownObject | null;
};

export type File<T extends FileTypeParameter = FileTypeParameter> = {
  filePath: string;
  fileName: {
    pascalCase: string;
    camelCase: string;
  };
  extension: {
    value: string;
    semanticsIdentifier: T['FileExtensionSemanticsIdentifier'];
  };
  additionalMetadata: T['AdditionalMetadata'];
};
