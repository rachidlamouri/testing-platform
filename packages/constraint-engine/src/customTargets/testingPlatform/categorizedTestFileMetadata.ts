import { Utf8FileMetadataTarget } from '../file/utf8File/utf8FileTarget';

export enum SupportedTestFileType {
  Bash = 'Bash',
  TypeScript = 'TypeScript',
}

export const fileExtensionsByType = {
  [SupportedTestFileType.Bash]: 'sh',
  [SupportedTestFileType.TypeScript]: 'ts',
} satisfies Record<SupportedTestFileType, string>;

export const fileTypesByExtension = Object.fromEntries(
  Object.entries(fileExtensionsByType).map(([k, v]) => [v, k]),
);

export const runCommandsByFileType = {
  [SupportedTestFileType.Bash]: 'bash',
  [SupportedTestFileType.TypeScript]: 'npx ts-node',
} satisfies Record<SupportedTestFileType, string>;

export type ConfigurableCategorizedTestFileMetadataProperties = {
  fileType: SupportedTestFileType | null;
};

export type CategorizedTestFileMetadata<
  TProperties extends ConfigurableCategorizedTestFileMetadataProperties,
> = Utf8FileMetadataTarget & {
  fileType: TProperties['fileType'];
};
