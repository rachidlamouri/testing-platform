import { InMemoryOdeshin2ListVoque } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { FilePath } from '../../programmable-units/file/filePath';
import { FileSystemNodeZorn } from '../../programmable-units/file/fileSystemNode';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import { GenericAstNodeLocator } from './astNodeLocator';

export type AstListEntry = Pick<GenericAstNodeLocator, 'astPath' | 'node'>;

type FileAstListConstructorInput = {
  filePath: FilePath;
  flattenedAst: AstListEntry[];
};

/**
 * The flattened list of AST nodes for a file
 */
type FileAstList = SpreadN<
  [
    {
      zorn: FileSystemNodeZorn;
    },
    FileAstListConstructorInput,
  ]
>;

export const { FileAstListInstance } = buildNamedConstructorFunction({
  constructorName: 'FileAstListInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'zorn',
    'filePath',
    'flattenedAst',
  ] as const satisfies readonly (keyof FileAstList)[],
})
  .withTypes<FileAstListConstructorInput, FileAstList>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      return {
        zorn: new FileSystemNodeZorn({
          nodePath: input.filePath.serialized,
        }),
        ...input,
      };
    },
  })
  .assemble();

export const FILE_AST_LIST_GEPP = 'file-ast-list';

type FileAstListGepp = typeof FILE_AST_LIST_GEPP;

export type FileAstListVoque = InMemoryOdeshin2ListVoque<
  FileAstListGepp,
  FileAstList
>;
