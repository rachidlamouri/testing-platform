import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';
import {
  ComparisonConfigurationTypeName,
  FilePathAccessorInput,
} from '../../../utilities/file/getNestedFilePaths';
import { Grition } from '../../adapter/grition';
import { StandardInMemoryVoque } from '../../../core/engine/inMemoryVoque';

export type FileSystemObjectEnumeratorConfiguration = FilePathAccessorInput;

export type FileSystemObjectEnumeratorConfigurationGrition =
  Grition<FileSystemObjectEnumeratorConfiguration>;

export type FileSystemObjectEnumeratorConfigurationHubblepup =
  Hubblepup<FileSystemObjectEnumeratorConfigurationGrition>;

export const FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP =
  'file-system-object-enumerator-configuration';

export type FileSystemObjectEnumeratorConfigurationGepp =
  typeof FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP;

export type FileSystemObjectEnumeratorConfigurationVoictent = Voictent<
  FileSystemObjectEnumeratorConfigurationGepp,
  FileSystemObjectEnumeratorConfigurationHubblepup
>;

/**
 * The information needed to traverse the file system.
 */
export type FileSystemObjectEnumeratorConfigurationVoque =
  StandardInMemoryVoque<
    FileSystemObjectEnumeratorConfigurationGepp,
    FileSystemObjectEnumeratorConfigurationHubblepup
  >;

export const FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION: FileSystemObjectEnumeratorConfigurationHubblepup =
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

export const VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION: FileSystemObjectEnumeratorConfigurationHubblepup =
  {
    directoryPath: 'packages/voictents-and-estinants-engine/',
    ignoredNodePathConfigurationList: [
      {
        typeName: ComparisonConfigurationTypeName.EndsWith,
        value: 'node_modules',
      },
    ],
  };

export const CI_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION: FileSystemObjectEnumeratorConfigurationHubblepup =
  {
    directoryPath: '.github',
    ignoredNodePathConfigurationList: [],
  };
