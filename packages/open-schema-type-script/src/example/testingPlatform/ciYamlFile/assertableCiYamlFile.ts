import yaml from 'yaml';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifer';
import { ActualCiYamlFileTypeScriptConfiguration } from './actualCiYamlFile';
import { ExpectedCiYamlFileContentsTypeScriptConfiguration } from './expectedCiYamlFileContents';

export type AssertableCiYamlFile = {
  actualStringContents: string;
  expectedStringContents: string;
};

export type AssertableCiYamlFileTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifier: TypeScriptSemanticsIdentifier.AssertableCiYamlFile;
    datumInstanceIdentifier: 'assertable-ci-yaml-file';
    datumInstance: AssertableCiYamlFile;
  }>;

export const buildAssertableCiYamlFileContentsConfiguration: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [
    ActualCiYamlFileTypeScriptConfiguration,
    ExpectedCiYamlFileContentsTypeScriptConfiguration,
  ];
  OutputCollection: [AssertableCiYamlFileTypeScriptConfiguration];
}> = (
  { datumInstance: actualCiYamlFile },
  { datumInstance: expectedCiYamlFileContents },
) => {
  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<AssertableCiYamlFileTypeScriptConfiguration> =
    {
      predicateIdentifiers: [
        TypeScriptSemanticsIdentifier.AssertableCiYamlFile,
      ],
      instanceIdentifier: 'assertable-ci-yaml-file',
      datumInstance: {
        actualStringContents: actualCiYamlFile.stringContents,
        expectedStringContents: yaml.stringify(expectedCiYamlFileContents),
      },
    };

  return [outputConfiguration];
};
