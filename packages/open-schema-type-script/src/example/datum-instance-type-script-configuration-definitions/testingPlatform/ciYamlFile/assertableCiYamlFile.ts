// DatumInstanceTypeScriptConfiguration

import yaml from 'yaml';
import fs from 'fs';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';
import { ActualCiYamlFileTypeScriptConfiguration } from './actualCiYamlFile';
import { ExpectedCiYamlFileContentsTypeScriptConfiguration } from './expectedCiYamlFileContents';

export type AssertableCiYamlFile = {
  actualStringContents: string;
  expectedStringContents: string;
};

export type AssertableCiYamlFileDatumInstanceIdentifier =
  'assertable-ci-yaml-file';

// TODO: make the file comment configurable to ignore this
export type AssertableCiYamlFileDatumInstanceAlias = symbol;

export type AssertableCiYamlFileTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.AssertableCiYamlFile,
    ];
    datumInstanceIdentifier: AssertableCiYamlFileDatumInstanceIdentifier;
    datumInstance: AssertableCiYamlFile;
    datumInstanceAliases: [];
  }>;

export const buildAssertableCiYamlFile: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [
    ActualCiYamlFileTypeScriptConfiguration,
    ExpectedCiYamlFileContentsTypeScriptConfiguration,
  ];
  OutputCollection: [AssertableCiYamlFileTypeScriptConfiguration];
}> = (
  { datumInstance: actualCiYamlFile },
  { datumInstance: expectedCiYamlFileContents },
) => {
  const expectedTextWithPlaceholders = yaml.stringify(
    expectedCiYamlFileContents,
  );

  // TODO: learn how to properly manage comments with the yaml library and remove this hack
  const expectedText = expectedTextWithPlaceholders.replaceAll(
    /( +)- COMMENT_PLACE_HOLDER:([^:]+): ""/g,
    '\n$1# $2',
  );

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<AssertableCiYamlFileTypeScriptConfiguration> =
    {
      predicateIdentifiers: [
        TypeScriptSemanticsIdentifier.AssertableCiYamlFile,
      ],
      instanceIdentifier: 'assertable-ci-yaml-file',
      datumInstance: {
        actualStringContents: actualCiYamlFile.stringContents,
        expectedStringContents: expectedText,
      },
      aliases: [],
    };

  // TODO: move this to the generator-engine when we have one
  fs.writeFileSync(actualCiYamlFile.filePath, expectedText);

  return [outputConfiguration];
};
