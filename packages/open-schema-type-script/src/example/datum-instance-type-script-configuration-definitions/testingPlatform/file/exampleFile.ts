// Skip

import { Merge } from '../../../../utilities/types/merge/merge';
import { File } from './file';
import { FileExtensionSuffixSemanticsIdentifier } from './fileExtensionSuffixSemanticsIdentifier';

export enum ExampleFileFileCommentText {
  SemanticsIdentifierEnumStuff = 'SemanticsIdentifierEnum',
  DatumInstanceTypeScriptConfigurationStuff = 'DatumInstanceTypeScriptConfiguration',
  SkipStuff = 'Skip',
}

export type ExampleFile<
  TFileCommentText extends string,
  TAdditionalMetadata extends object,
> = File<{
  FileExtensionSuffixSemanticsIdentifier: FileExtensionSuffixSemanticsIdentifier.TypeScript;
  AdditionalMetadata: Merge<
    { fileCommentText: TFileCommentText },
    TAdditionalMetadata
  >;
}>;
