import { Hubblepup } from '../../../type-script-adapter/hubblepup';
import { Voictent } from '../../../type-script-adapter/voictent';
import {
  ComparisonConfigurationTypeName,
  FilePathAccessorInput,
} from '../../../utilities/file/getNestedFilePaths';

export type FileAConfiguration = FilePathAccessorInput;

export type FileAConfigurationHubblepup = Hubblepup<FilePathAccessorInput>;

export const FILE_A_CONFIGURATION_GEPP = 'file-a-configuration';

export type FileAConfigurationGepp = typeof FILE_A_CONFIGURATION_GEPP;

export type FileAConfigurationVoictent = Voictent<
  FileAConfigurationGepp,
  FileAConfigurationHubblepup
>;

export const FULL_FILE_A_CONFIGURATION: FileAConfigurationHubblepup = {
  directoryPath: '.',
  ignoredNodePathConfigurations: [
    {
      typeName: ComparisonConfigurationTypeName.Equals,
      value: '.git',
    },
    {
      typeName: ComparisonConfigurationTypeName.Equals,
      value: 'debug',
    },
    {
      typeName: ComparisonConfigurationTypeName.EndsWith,
      value: 'node_modules',
    },
  ],
};

export const PIPES_AND_FILTERS_FILE_A_CONFIGURATION: FileAConfigurationHubblepup =
  {
    directoryPath: 'packages/pipes-and-filters-engine/src',
    ignoredNodePathConfigurations: [],
  };

export const CI_FILE_A_CONFIGURATION: FileAConfigurationHubblepup = {
  directoryPath: '.github',
  ignoredNodePathConfigurations: [],
};
