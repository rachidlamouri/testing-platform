import { Quirm } from '../../core/quirm';
import {
  ComparisonConfigurationTypeName,
  FilePathAccessorInput,
} from '../../utilities/file/getNestedFilePaths';

export const FILE_A_CONFIGURATION_GIPP = 'file-a-configuration';

export type FileAConfiguration = FilePathAccessorInput;

export const FULL_FILE_A_CONFIGURATION_QUIRM: Quirm<FileAConfiguration> = {
  gippTuple: [FILE_A_CONFIGURATION_GIPP],
  hubblepup: {
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
  },
};

export const SIMPLE_FILE_A_CONFIGURATION_QUIRM: Quirm<FileAConfiguration> = {
  gippTuple: [FILE_A_CONFIGURATION_GIPP],
  hubblepup: {
    directoryPath: 'packages/open-schema-type-script/src',
    ignoredNodePathConfigurations: [
      {
        typeName: ComparisonConfigurationTypeName.Equals,
        value: 'packages/open-schema-type-script/src/v1',
      },
    ],
  },
};
