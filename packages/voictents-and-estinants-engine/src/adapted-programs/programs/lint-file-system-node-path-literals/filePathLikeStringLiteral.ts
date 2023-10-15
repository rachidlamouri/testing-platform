import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { FilePath } from '../../programmable-units/file/filePath';

const FILE_PATH_LIKE_STRING_LITERAL_ID_TEMPLATE = [
  'sourceFileFilePath',
  'referencedFilePath',
  'lineNumber',
  'columnNumber',
] as const satisfies GenericComplexIdTemplate;
type FilePathLikeStringLiteralIdTemplate =
  typeof FILE_PATH_LIKE_STRING_LITERAL_ID_TEMPLATE;
class FilePathLikeStringLiteralId extends ComplexId<FilePathLikeStringLiteralIdTemplate> {
  get rawTemplate(): FilePathLikeStringLiteralIdTemplate {
    return FILE_PATH_LIKE_STRING_LITERAL_ID_TEMPLATE;
  }
}

type FilePathLikeStringLiteralConstructorInput = {
  sourceFileFilePath: FilePath;
  referencedFilePath: string;
  resolvedFilePath: string[];
  lineNumber: string;
  columnNumber: string;
};

/**
 * The file system node path of a TypeScript string literal that looks like a
 * file system node path
 */
type FilePathLikeStringLiteral = SimplifyN<
  [
    { id: FilePathLikeStringLiteralId },
    FilePathLikeStringLiteralConstructorInput,
  ]
>;

export const { FilePathLikeStringLiteralInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FilePathLikeStringLiteralInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'id',
      'sourceFileFilePath',
      'referencedFilePath',
      'resolvedFilePath',
      'lineNumber',
      'columnNumber',
    ] as const satisfies readonly (keyof FilePathLikeStringLiteral)[],
  })
    .withTypes<
      FilePathLikeStringLiteralConstructorInput,
      FilePathLikeStringLiteral
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const {
          sourceFileFilePath,
          referencedFilePath,
          resolvedFilePath,
          lineNumber,
          columnNumber,
        } = input;

        const id = new FilePathLikeStringLiteralId({
          sourceFileFilePath: sourceFileFilePath.serialized,
          referencedFilePath,
          lineNumber,
          columnNumber,
        });

        return {
          id,
          ...input,
          resolvedFilePath,
        } satisfies FilePathLikeStringLiteral;
      },
    })
    .assemble();

export const FILE_PATH_LIKE_STRING_LITERAL_COLLECTION_ID =
  'file-path-like-string-literal';

type FilePathLikeStringLiteralCollectionId =
  typeof FILE_PATH_LIKE_STRING_LITERAL_COLLECTION_ID;

export type FilePathLikeStringLiteralStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    FilePathLikeStringLiteralCollectionId,
    FilePathLikeStringLiteral
  >;
