import { TSESTree } from '@typescript-eslint/typescript-estree';
import {
  UnknownCollectionLocator,
  UnknownCollectionLocatorPart,
} from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { FileTypeScriptSemanticsIdentifier } from './fileTypeScriptSemanticsIdentifier';
import { FileExtensionSuffixSemanticsIdentifier } from './fileExtensionSuffixSemanticsIdentifier';
import { TypeScriptFileTypeScriptConfiguration } from './typeScriptFileA';
import { ExampleFile } from './exampleFile';

export type ExampleFileA<TFileCommentText extends string = string> =
  ExampleFile<TFileCommentText, { program: TSESTree.Program }>;

export type ExampleFileADatumInstanceIdentifier =
  `${FileTypeScriptSemanticsIdentifier.ExampleFileA}:${UnknownCollectionLocatorPart}`;

export type ExampleFileADatumInstanceAlias =
  `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.ExampleFileA}`;

export type ExampleFileATypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [FileTypeScriptSemanticsIdentifier.ExampleFileA];
    datumInstanceIdentifier: UnknownCollectionLocator;
    datumInstance: ExampleFileA;
    datumInstanceAliases: [ExampleFileADatumInstanceAlias];
  }>;

export const buildExampleFileA: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [TypeScriptFileTypeScriptConfiguration];
  OutputCollection: [] | [ExampleFileATypeScriptConfiguration];
}> = (inputConfiguration) => {
  const typeScriptFileA = inputConfiguration.datumInstance;

  if (
    // TODO: use a different convention for files that need linting
    !typeScriptFileA.filePath.includes(
      'datum-instance-type-script-configuration-definitions',
    )
  ) {
    return [];
  }

  const program = typeScriptFileA.additionalMetadata.ast;

  const fileComments = program.comments ?? [];
  const firstComment = fileComments[0] ?? null;

  let fileCommentText = '';
  if (firstComment !== null && firstComment.range[0] === 0) {
    fileCommentText = firstComment.value.trim();
  }

  const alias: ExampleFileADatumInstanceAlias = `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.ExampleFileA}`;

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<ExampleFileATypeScriptConfiguration> =
    {
      instanceIdentifier: `${FileTypeScriptSemanticsIdentifier.ExampleFileA}:${typeScriptFileA.filePath}`,
      datumInstance: {
        ...inputConfiguration.datumInstance,
        additionalMetadata: {
          fileCommentText,
          program,
        },
      },
      predicateIdentifiers: [FileTypeScriptSemanticsIdentifier.ExampleFileA],
      aliases: [alias],
    };

  return [outputConfiguration];
};
