// DatumInstanceTypeScriptConfiguration

import fs from 'fs';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';

export type ActualCiYamlFile = {
  filePath: '.github/workflows/continuous-integration.yml';
  stringContents: string;
};

export type ActualCiYamlFileTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.ActualCiYamlFileType,
    ];
    datumInstanceIdentifier: 'actual-ci-yaml-file';
    datumInstance: ActualCiYamlFile;
    datumInstanceAliases: [];
  }>;

export const buildActualCiYamlFileContents: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [];
  OutputCollection: [ActualCiYamlFileTypeScriptConfiguration];
}> = () => {
  const filePath = '.github/workflows/continuous-integration.yml';
  const stringContents = fs.readFileSync(filePath, 'utf8');

  const outputConfiguration: DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration<ActualCiYamlFileTypeScriptConfiguration> =
    {
      predicateIdentifiers: [
        TypeScriptSemanticsIdentifier.ActualCiYamlFileType,
      ],
      instanceIdentifier: 'actual-ci-yaml-file',
      datumInstance: {
        filePath,
        stringContents,
      },
      aliases: [],
    };

  return [outputConfiguration];
};
