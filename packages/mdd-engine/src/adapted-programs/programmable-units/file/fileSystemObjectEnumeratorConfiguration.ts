import {
  ComparisonConfigurationTypeName,
  FilePathAccessorInput,
} from '../../../package-agnostic-utilities/file/getNestedFileSystemNodeMetadataList';
import { StandardInMemoryStreamMetatype } from '../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';

/**
 * The information needed to traverse the file system.
 */
type FileSystemObjectEnumeratorConfiguration = FilePathAccessorInput;

export const FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID =
  'file-system-object-enumerator-configuration';

type FileSystemObjectEnumeratorConfigurationCollectionId =
  typeof FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID;

export type FileSystemObjectEnumeratorConfigurationStreamMetatype =
  StandardInMemoryStreamMetatype<
    FileSystemObjectEnumeratorConfigurationCollectionId,
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

export const ENGINE_PACKAGE_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION: FileSystemObjectEnumeratorConfiguration =
  {
    directoryPath: 'packages/mdd-engine',
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
