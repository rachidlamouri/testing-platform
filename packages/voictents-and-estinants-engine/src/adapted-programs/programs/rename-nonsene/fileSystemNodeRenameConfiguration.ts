import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { FileSystemNodeZorn } from '../../programmable-units/file/fileSystemNode';

/**
 * The information needed to rename a file or directory
 */
type FileSystemNodeRenameConfiguration = {
  zorn: FileSystemNodeZorn;
  newPath: string;
};

export const { FileSystemNodeRenameConfigurationInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FileSystemNodeRenameConfigurationInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'newPath',
    ] as const satisfies readonly (keyof FileSystemNodeRenameConfiguration)[],
  })
    .withTypes<
      FileSystemNodeRenameConfiguration,
      FileSystemNodeRenameConfiguration
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => input,
    })
    .assemble();

export const FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP =
  'file-system-node-rename-configuration';

type FileSystemNodeRenameConfigurationGepp =
  typeof FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP;

export type FileSystemNodeRenameConfigurationVoque = InMemoryOdeshin2ListVoque<
  FileSystemNodeRenameConfigurationGepp,
  FileSystemNodeRenameConfiguration
>;
