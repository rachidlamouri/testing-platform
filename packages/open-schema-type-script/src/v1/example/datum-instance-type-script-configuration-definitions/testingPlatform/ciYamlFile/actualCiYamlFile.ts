// DatumInstanceTypeScriptConfiguration

import fs from 'fs';
import {
  DatumInstanceTypeScriptConfiguration,
  DatumInstanceTypeScriptConfigurationToDatumInstanceConfiguration,
} from '../../../../type-script/datumInstanceTypeScriptConfiguration';
import { DatumInstanceTypeScriptConfigurationCollectionBuilder } from '../../../../type-script/datumInstanceTypeScriptConfigurationCollectionBuilder';
import { TypeScriptSemanticsIdentifier } from '../typeScriptSemanticsIdentifier';

export type ActualCiYamlFile = {
  filePath: '.github/workflows/continuous-integration.yaml';
  stringContents: string;
};

export type ActualCiYamlFileDatumInstanceIdentifier = 'actual-ci-yaml-file';

// TODO: make the file comment configurable to ignore this
export type ActualCiYamlFileDatumInstanceAlias = symbol;

export type ActualCiYamlFileTypeScriptConfiguration =
  DatumInstanceTypeScriptConfiguration<{
    typeSemanticsIdentifiers: [
      TypeScriptSemanticsIdentifier.ActualCiYamlFileType,
    ];
    datumInstanceIdentifier: ActualCiYamlFileDatumInstanceIdentifier;
    datumInstance: ActualCiYamlFile;
    datumInstanceAliases: [];
  }>;

export const buildActualCiYamlFile: DatumInstanceTypeScriptConfigurationCollectionBuilder<{
  InputCollection: [];
  OutputCollection: [ActualCiYamlFileTypeScriptConfiguration];
}> = () => {
  const filePath = '.github/workflows/continuous-integration.yaml';
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
