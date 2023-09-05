import { InMemoryOdeshin2ListVoque } from '../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../utilities/semantic-types/zorn';
import { SimplifyN } from '../../../../utilities/simplify';
import { FileSystemNodeZorn } from '../../../programmable-units/file/fileSystemNode';
import { BoundedFile } from '../file/boundedFile';

const FILE_DEPENDENCY_ZORN_TEMPLATE = [
  ['importingFile', FileSystemNodeZorn],
  ['importedFile', FileSystemNodeZorn],
] as const satisfies GenericZorn2Template;
type FileDependencyZornTemplate = typeof FILE_DEPENDENCY_ZORN_TEMPLATE;
class FileDependencyZorn extends Zorn2<FileDependencyZornTemplate> {
  get rawTemplate(): FileDependencyZornTemplate {
    return FILE_DEPENDENCY_ZORN_TEMPLATE;
  }
}

type FileDependencyConstructorInput = {
  importingFile: BoundedFile;
  importedFile: BoundedFile;
};

/**
 * Defines a single impor relationship between two bounded files
 */
type FileDependency = SimplifyN<
  [
    {
      zorn: FileDependencyZorn;
    },
    FileDependencyConstructorInput,
  ]
>;

export const { FileDependencyInstance } = buildNamedConstructorFunction({
  constructorName: 'FileDependencyInstance',
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'importingFile',
    'importedFile',
  ],
} as const)
  .withTypes<FileDependencyConstructorInput, FileDependency>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { importingFile, importedFile } = input;

      const zorn = new FileDependencyZorn({
        importingFile: importingFile.zorn,
        importedFile: importedFile.zorn,
      });

      return {
        zorn,
        ...input,
      };
    },
  })
  .assemble();

export const FILE_DEPENDENCY_GEPP = 'file-dependency';

type FileDependencyGepp = typeof FILE_DEPENDENCY_GEPP;

export type FileDependencyVoque = InMemoryOdeshin2ListVoque<
  FileDependencyGepp,
  FileDependency
>;
