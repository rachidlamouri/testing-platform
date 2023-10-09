import { posix } from 'path';
import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../package-agnostic-utilities/datastructure/zorn';
import { File } from './file';

const FILE_ANCESTOR_DIRECTORY_PATH_SET_ZORN_TEMPLATE = [
  'filePath',
] as const satisfies GenericComplexzornTemplate;
type FileAncestorDirectoryPathSetZornTemplate =
  typeof FILE_ANCESTOR_DIRECTORY_PATH_SET_ZORN_TEMPLATE;
class FileAncestorDirectoryPathSetZorn extends Complexzorn<FileAncestorDirectoryPathSetZornTemplate> {
  get rawTemplate(): FileAncestorDirectoryPathSetZornTemplate {
    return FILE_ANCESTOR_DIRECTORY_PATH_SET_ZORN_TEMPLATE;
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
  zorn: FileAncestorDirectoryPathSetZorn;
  filePath: string;
  set: string[];
};

export const { FileAncestorDirectoryPathSetInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FileAncestorDirectoryPathSetInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'filePath',
      'set',
    ] as const satisfies readonly (keyof FileAncestorDirectoryPathSet)[],
  })
    .withTypes<
      FileAncestorDirectoryPathSetConstructorInput,
      FileAncestorDirectoryPathSet
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { file } = input;
        const { filePath } = file;

        const zorn = new FileAncestorDirectoryPathSetZorn({
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
          zorn,
          filePath: filePath.serialized,
          set: ancestorDirectorySet,
        } satisfies FileAncestorDirectoryPathSet;
      },
    })
    .assemble();

export const FILE_ANCESTOR_DIRECTORY_PATH_SET_GEPP =
  'file-ancestor-directory-path-set';

type FileAncestorDirectoryPathSetGepp =
  typeof FILE_ANCESTOR_DIRECTORY_PATH_SET_GEPP;

export type FileAncestorDirectoryPathSetVoque = InMemoryOdeshin2ListVoque<
  FileAncestorDirectoryPathSetGepp,
  FileAncestorDirectoryPathSet
>;
