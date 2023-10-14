import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { FilePath } from '../../programmable-units/file/filePath';
import { FileSystemNodeId } from '../../programmable-units/file/fileSystemNode';
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
      id: FileSystemNodeId;
    },
    FileAstListConstructorInput,
  ]
>;

export const { FileAstListInstance } = buildNamedConstructorFunction({
  constructorName: 'FileAstListInstance' as const,
  instancePropertyNameTuple: [
    // keep this as a multiline list
    'id',
    'filePath',
    'flattenedAst',
  ] as const satisfies readonly (keyof FileAstList)[],
})
  .withTypes<FileAstListConstructorInput, FileAstList>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      return {
        id: new FileSystemNodeId({
          nodePath: input.filePath.serialized,
        }),
        ...input,
      };
    },
  })
  .assemble();

export const FILE_AST_LIST_GEPP = 'file-ast-list';

type FileAstListGepp = typeof FILE_AST_LIST_GEPP;

export type FileAstListVoque = InMemoryIdentifiableItem2ListStreamMetatype<
  FileAstListGepp,
  FileAstList
>;
