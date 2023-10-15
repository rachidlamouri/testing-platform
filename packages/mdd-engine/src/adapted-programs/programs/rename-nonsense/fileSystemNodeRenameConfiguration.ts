import { posix } from 'path';
import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import { FileSystemNodeId } from '../../programmable-units/file/fileSystemNode';
import { NodePath } from '../../programmable-units/file/nodePath';

type FileSystemNodeRenameConfigurationInput = {
  id: FileSystemNodeId;
  isDirectory: boolean;
  oldNodePath: NodePath;
  relativeNewPath: string;
};

/**
 * The information needed to rename a file or directory
 */
export type FileSystemNodeRenameConfiguration = SpreadN<
  [
    FileSystemNodeRenameConfigurationInput,
    {
      oldAbsolutePath: string;
      newAbsolutePath: string;
    },
  ]
>;

export const { FileSystemNodeRenameConfigurationInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FileSystemNodeRenameConfigurationInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'id',
      'isDirectory',
      'oldNodePath',
      'relativeNewPath',
      'oldAbsolutePath',
      'newAbsolutePath',
    ] as const satisfies readonly (keyof FileSystemNodeRenameConfiguration)[],
  })
    .withTypes<
      FileSystemNodeRenameConfigurationInput,
      FileSystemNodeRenameConfiguration
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const oldAbsolutePath = posix.resolve(input.oldNodePath.serialized);
        const newAbsolutePath = posix.resolve(input.relativeNewPath);

        return {
          ...input,
          oldAbsolutePath,
          newAbsolutePath,
        };
      },
    })
    .assemble();

export const FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID =
  'file-system-node-rename-configuration';

type FileSystemNodeRenameConfigurationCollectionId =
  typeof FILE_SYSTEM_NODE_RENAME_CONFIGURATION_COLLECTION_ID;

export type FileSystemNodeRenameConfigurationStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    FileSystemNodeRenameConfigurationCollectionId,
    FileSystemNodeRenameConfiguration
  >;
