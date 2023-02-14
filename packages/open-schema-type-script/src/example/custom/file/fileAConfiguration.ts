import {
  ComparisonConfigurationTypeName,
  FilePathAccessorInput,
} from '../../../utilities/file/getNestedFilePaths';
import { Grition } from '../custom-constructs/grition';
import { Odeshin } from '../custom-constructs/odeshin';
import { Plifal } from '../custom-constructs/plifal';

export const FILE_A_CONFIGURATION_IDENTIFIER = 'file-a-configuration' as const;

export type FileAConfigurationIdentifier =
  typeof FILE_A_CONFIGURATION_IDENTIFIER;

export type FileAConfiguration = Grition<FilePathAccessorInput>;

export type FileAConfigurationOdeshin = Odeshin<
  FileAConfigurationIdentifier,
  FilePathAccessorInput
>;

export const FILE_A_CONFIGURATION_GEPP = FILE_A_CONFIGURATION_IDENTIFIER;

export type FileAConfigurationGepp = typeof FILE_A_CONFIGURATION_GEPP;

export type FileAConfigurationQuirm = Plifal<
  [FileAConfigurationGepp],
  FileAConfigurationOdeshin
>;

export const FULL_FILE_A_CONFIGURATION_QUIRM: FileAConfigurationQuirm = {
  geppTuple: [FILE_A_CONFIGURATION_GEPP],
  hubblepup: {
    identifier: FILE_A_CONFIGURATION_IDENTIFIER,
    grition: {
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
  },
};

export const SIMPLE_FILE_A_CONFIGURATION_QUIRM: FileAConfigurationQuirm = {
  geppTuple: [FILE_A_CONFIGURATION_GEPP],
  hubblepup: {
    identifier: FILE_A_CONFIGURATION_IDENTIFIER,
    grition: {
      directoryPath: 'packages/open-schema-type-script/src',
      ignoredNodePathConfigurations: [
        {
          typeName: ComparisonConfigurationTypeName.Equals,
          value: 'packages/open-schema-type-script/src/v1',
        },
      ],
    },
  },
};

export const CI_FILE_A_CONFIGURATION_QUIRM: FileAConfigurationQuirm = {
  geppTuple: [FILE_A_CONFIGURATION_GEPP],
  hubblepup: {
    identifier: FILE_A_CONFIGURATION_IDENTIFIER,
    grition: {
      directoryPath: '.github',
      ignoredNodePathConfigurations: [],
    },
  },
};
