// DatumInstanceTypeScriptConfiguration

import { UnknownCollectionLocatorPart } from '../../../../core/collectionLocator';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { FileTypeScriptSemanticsIdentifier } from './fileTypeScriptSemanticsIdentifier';
import { FileExtensionSuffixSemanticsIdentifier } from './fileExtensionSuffixSemanticsIdentifier';
import { ExampleFileBTypeScriptConfiguration } from './exampleFileB';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { ExampleFile, ExampleFileFileCommentText } from './exampleFile';
import {
  getEnhancedDeclarations,
  EnhancedDeclaration,
} from './getEnhancedDeclarations';
import { getExportDeclarations } from './getExportDeclarations';

export type ExampleFileBDatumInstanceTypeScriptConfiguration = ExampleFile<
  ExampleFileFileCommentText.DatumInstanceTypeScriptConfigurationStuff,
  {
    expectedTypeNames: {
      instance: EnhancedDeclaration;
      identifier: EnhancedDeclaration;
      alias: EnhancedDeclaration;
      configuration: EnhancedDeclaration;
      builder: EnhancedDeclaration;
    };
    declarations: EnhancedDeclaration[];
  }
>;

export type ExampleFileBDatumInstanceTypeScriptConfigurationDatumInstanceIdentifier =
  `${FileTypeScriptSemanticsIdentifier.ExampleFileBDatumInstanceTypeScriptConfiguration}:${UnknownCollectionLocatorPart}`;

export type ExampleFileBDatumInstanceTypeScriptConfigurationDatumInstanceAlias =
  `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.ExampleFileBDatumInstanceTypeScriptConfiguration}`;

export type ExampleFileBDatumInstanceTypeScriptConfigurationTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      FileTypeScriptSemanticsIdentifier.ExampleFileBDatumInstanceTypeScriptConfiguration,
    ];
    datumInstanceIdentifier: ExampleFileBDatumInstanceTypeScriptConfigurationDatumInstanceIdentifier;
    datumInstance: ExampleFileBDatumInstanceTypeScriptConfiguration;
    datumInstanceAliases: [
      ExampleFileBDatumInstanceTypeScriptConfigurationDatumInstanceAlias,
    ];
  }>;

export const buildExampleFileBDatumInstanceTypeScriptConfiguration: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [ExampleFileBTypeScriptConfiguration];
  OutputCollection:
    | []
    | [ExampleFileBDatumInstanceTypeScriptConfigurationTypeScriptConfiguration];
}> = (inputConfiguration) => {
  // TODO: Figure out how to dynamically determine this semantics through the validation engine
  if (
    inputConfiguration.datumInstance.additionalMetadata.fileCommentText !==
    ExampleFileFileCommentText.DatumInstanceTypeScriptConfigurationStuff
  ) {
    return [];
  }

  const alias: ExampleFileBDatumInstanceTypeScriptConfigurationDatumInstanceAlias = `${FileExtensionSuffixSemanticsIdentifier.TypeScript}:${FileTypeScriptSemanticsIdentifier.ExampleFileBDatumInstanceTypeScriptConfiguration}`;

  const baseTypeName =
    inputConfiguration.datumInstance.inMemoryFileName.pascalCase;

  const exportDeclarations = getExportDeclarations(
    inputConfiguration.datumInstance.additionalMetadata.program,
  );
  const enhancedDeclarations = getEnhancedDeclarations(
    inputConfiguration.datumInstance.filePath,
    exportDeclarations,
  );

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<ExampleFileBDatumInstanceTypeScriptConfigurationTypeScriptConfiguration> =
    {
      instanceIdentifier: `${FileTypeScriptSemanticsIdentifier.ExampleFileBDatumInstanceTypeScriptConfiguration}:${inputConfiguration.datumInstance.filePath}`,
      datumInstance: {
        ...inputConfiguration.datumInstance,
        additionalMetadata: {
          fileCommentText:
            inputConfiguration.datumInstance.additionalMetadata.fileCommentText,
          expectedTypeNames: {
            instance: {
              typeName: 'type',
              identifier: baseTypeName,
            },
            identifier: {
              typeName: 'type',
              identifier: `${baseTypeName}DatumInstanceIdentifier`,
            },
            alias: {
              typeName: 'type',
              identifier: `${baseTypeName}DatumInstanceAlias`,
            },
            configuration: {
              typeName: 'type',
              identifier: `${baseTypeName}TypeScriptConfiguration`,
            },
            builder: {
              typeName: 'code',
              identifier: `build${baseTypeName}`,
            },
          },
          declarations: enhancedDeclarations,
        },
      },
      predicateIdentifiers: [
        FileTypeScriptSemanticsIdentifier.ExampleFileBDatumInstanceTypeScriptConfiguration,
      ],
      aliases: [alias],
    };

  return [outputConfiguration];
};
