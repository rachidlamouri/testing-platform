import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { FilePath } from '../../programmable-units/file/filePath';

const FILE_PATH_LIKE_STRING_LITERAL_ZORN_TEMPLATE = [
  'sourceFileFilePath',
  'referencedFilePath',
  'lineNumber',
  'columnNumber',
] as const satisfies GenericComplexIdTemplate;
type FilePathLikeStringLiteralZornTemplate =
  typeof FILE_PATH_LIKE_STRING_LITERAL_ZORN_TEMPLATE;
class FilePathLikeStringLiteralZorn extends ComplexId<FilePathLikeStringLiteralZornTemplate> {
  get rawTemplate(): FilePathLikeStringLiteralZornTemplate {
    return FILE_PATH_LIKE_STRING_LITERAL_ZORN_TEMPLATE;
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
    { zorn: FilePathLikeStringLiteralZorn },
    FilePathLikeStringLiteralConstructorInput,
  ]
>;

export const { FilePathLikeStringLiteralInstance } =
  buildNamedConstructorFunction({
    constructorName: 'FilePathLikeStringLiteralInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
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

        const zorn = new FilePathLikeStringLiteralZorn({
          sourceFileFilePath: sourceFileFilePath.serialized,
          referencedFilePath,
          lineNumber,
          columnNumber,
        });

        return {
          zorn,
          ...input,
          resolvedFilePath,
        } satisfies FilePathLikeStringLiteral;
      },
    })
    .assemble();

export const FILE_PATH_LIKE_STRING_LITERAL_GEPP =
  'file-path-like-string-literal';

type FilePathLikeStringLiteralGepp = typeof FILE_PATH_LIKE_STRING_LITERAL_GEPP;

export type FilePathLikeStringLiteralVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    FilePathLikeStringLiteralGepp,
    FilePathLikeStringLiteral
  >;
