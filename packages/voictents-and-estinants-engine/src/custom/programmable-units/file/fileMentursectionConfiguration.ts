import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';
import {
  ComparisonConfigurationTypeName,
  FilePathAccessorInput,
} from '../../../utilities/file/getNestedFilePaths';
import { Grition } from '../../adapter/grition';

export type FileMentursectionConfiguration = FilePathAccessorInput;

export type FileMentursectionConfigurationGrition =
  Grition<FileMentursectionConfiguration>;

export type FileMentursectionConfigurationHubblepup =
  Hubblepup<FileMentursectionConfigurationGrition>;

export const FILE_MENTURSECTION_CONFIGURATION_GEPP =
  'file-mentursection-configuration';

export type FileMentursectionConfigurationGepp =
  typeof FILE_MENTURSECTION_CONFIGURATION_GEPP;

export type FileMentursectionConfigurationVoictent = Voictent<
  FileMentursectionConfigurationGepp,
  FileMentursectionConfigurationHubblepup
>;

export const FULL_FILE_MENTURSECTION_CONFIGURATION: FileMentursectionConfigurationHubblepup =
  {
    directoryPath: '.',
    ignoredNodePathConfigurationList: [
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

export const VOICTENTS_AND_ESTINANTS_FILE_MENTURSECTION_CONFIGURATION: FileMentursectionConfigurationHubblepup =
  {
    directoryPath: 'packages/voictents-and-estinants-engine/src',
    ignoredNodePathConfigurationList: [],
  };

export const CI_FILE_MENTURSECTION_CONFIGURATION: FileMentursectionConfigurationHubblepup =
  {
    directoryPath: '.github',
    ignoredNodePathConfigurationList: [],
  };
