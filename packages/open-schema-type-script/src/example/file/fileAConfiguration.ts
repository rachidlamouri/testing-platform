import { Quirm } from '../../core/quirm';
import {
  ComparisonConfigurationTypeName,
  FilePathAccessorInput,
} from '../../utilities/file/getNestedFilePaths';
import { Grition } from '../core/grition';
import { Odeshin } from '../core/odeshin';

export const FILE_A_CONFIGURATION_IDENTIFIER = 'file-a-configuration' as const;

export type FileAConfigurationIdentifier =
  typeof FILE_A_CONFIGURATION_IDENTIFIER;

export type FileAConfiguration = Grition<FilePathAccessorInput>;

export type FileAConfigurationOdeshin = Odeshin<
  FileAConfigurationIdentifier,
  FilePathAccessorInput
>;

export type FileAConfigurationQuirm = Quirm<FileAConfigurationOdeshin>;

export const FILE_A_CONFIGURATION_GEPP = FILE_A_CONFIGURATION_IDENTIFIER;

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
