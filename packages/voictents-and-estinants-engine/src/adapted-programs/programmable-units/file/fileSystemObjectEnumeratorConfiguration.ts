import {
  ComparisonConfigurationTypeName,
  FilePathAccessorInput,
} from '../../../package-agnostic-utilities/file/getNestedFileSystemNodeMetadataList';
import { StandardInMemoryVoque } from '../../../layer-agnostic-utilities/voque/inMemoryVoque';

/**
 * The information needed to traverse the file system.
 */
type FileSystemObjectEnumeratorConfiguration = FilePathAccessorInput;

export const FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP =
  'file-system-object-enumerator-configuration';

type FileSystemObjectEnumeratorConfigurationGepp =
  typeof FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP;

export type FileSystemObjectEnumeratorConfigurationVoque =
  StandardInMemoryVoque<
    FileSystemObjectEnumeratorConfigurationGepp,
    FileSystemObjectEnumeratorConfiguration
  >;

export const FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION: FileSystemObjectEnumeratorConfiguration =
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

export const VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION: FileSystemObjectEnumeratorConfiguration =
  {
    directoryPath: 'packages/voictents-and-estinants-engine/',
    ignoredNodePathConfigurationList: [
      {
        typeName: ComparisonConfigurationTypeName.EndsWith,
        value: 'node_modules',
      },
      {
        typeName: ComparisonConfigurationTypeName.Includes,
        value: '/generated/',
      },
    ],
  };

export const CI_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION: FileSystemObjectEnumeratorConfiguration =
  {
    directoryPath: '.github',
    ignoredNodePathConfigurationList: [],
  };
