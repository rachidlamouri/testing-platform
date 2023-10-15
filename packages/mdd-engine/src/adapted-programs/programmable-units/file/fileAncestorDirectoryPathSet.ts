import { posix } from 'path';
import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { File } from './file';

const FILE_ANCESTOR_DIRECTORY_PATH_SET_ID_TEMPLATE = [
  'filePath',
] as const satisfies GenericComplexIdTemplate;
type FileAncestorDirectoryPathSetIdTemplate =
  typeof FILE_ANCESTOR_DIRECTORY_PATH_SET_ID_TEMPLATE;
class FileAncestorDirectoryPathSetId extends ComplexId<FileAncestorDirectoryPathSetIdTemplate> {
  get rawTemplate(): FileAncestorDirectoryPathSetIdTemplate {
    return FILE_ANCESTOR_DIRECTORY_PATH_SET_ID_TEMPLATE;
  }
}

type FileAncestorDirectoryPathSetConstructorInput = {
  file: File;
};

/**
 * Contains the set of ancestor directory paths for a file. That is, the set of
 * full directory paths for each directory in a file path. They are ordered from
 * the furthest ancestor to the parent directory.
 */
type FileAncestorDirectoryPathSet = {
  id: FileAncestorDirectoryPathSetId;
  filePath: string;
  set: string[];
};

export const { FileAncestorDirectoryPathSetInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FileAncestorDirectoryPathSetInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'id',
      'filePath',
      'set',
    ] as const satisfies readonly (keyof FileAncestorDirectoryPathSet)[],
  })
    .withTypes<
      FileAncestorDirectoryPathSetConstructorInput,
      FileAncestorDirectoryPathSet
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { file } = input;
        const { filePath } = file;

        const id = new FileAncestorDirectoryPathSetId({
          filePath: filePath.serialized,
        });

        const ancestorDirectorySet = [];
        let nextDirectoryPath = filePath.parentDirectoryPath;
        while (nextDirectoryPath !== '.') {
          ancestorDirectorySet.push(nextDirectoryPath);
          nextDirectoryPath = posix.dirname(nextDirectoryPath);
        }

        ancestorDirectorySet.reverse();

        return {
          id,
          filePath: filePath.serialized,
          set: ancestorDirectorySet,
        } satisfies FileAncestorDirectoryPathSet;
      },
    })
    .assemble();

export const FILE_ANCESTOR_DIRECTORY_PATH_SET_COLLECTION_ID =
  'file-ancestor-directory-path-set';

type FileAncestorDirectoryPathSetCollectionId =
  typeof FILE_ANCESTOR_DIRECTORY_PATH_SET_COLLECTION_ID;

export type FileAncestorDirectoryPathSetStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    FileAncestorDirectoryPathSetCollectionId,
    FileAncestorDirectoryPathSet
  >;
