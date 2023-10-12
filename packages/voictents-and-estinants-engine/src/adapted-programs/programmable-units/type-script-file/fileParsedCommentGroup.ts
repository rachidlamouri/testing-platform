import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { buildNamedConstructorFunction } from '../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../package-agnostic-utilities/data-structure/id';
import { SimplifyN } from '../../../package-agnostic-utilities/type/simplify';
import { CategorizedComment } from './comment/categorized/categorizedComment';
import { CategorizedCommentTypeName } from './comment/categorized/categorizedCommentTypeName';
import { DescriptiveBlockComment } from './comment/categorized/descriptiveBlockComment';
import { CommentTagId } from './comment/commentTagId';

const FILE_PARSED_COMMENT_GROUP_ZORN_TEMPLATE = [
  'filePath',
] as const satisfies GenericComplexIdTemplate;
type FileParsedCommentGroupZornTemplate =
  typeof FILE_PARSED_COMMENT_GROUP_ZORN_TEMPLATE;
class FileParsedCommentGroupZorn extends ComplexId<FileParsedCommentGroupZornTemplate> {
  get rawTemplate(): FileParsedCommentGroupZornTemplate {
    return FILE_PARSED_COMMENT_GROUP_ZORN_TEMPLATE;
  }
}

type FileParsedCommentGroupConstructorInput = {
  filePath: string;
  list: CategorizedComment[];
  fileComment: DescriptiveBlockComment | null;
};

/**
 * The categorized set of comments for a TypeScript file
 */
export type FileParsedCommentGroup = SimplifyN<
  [
    {
      zorn: FileParsedCommentGroupZorn;
    },
    FileParsedCommentGroupConstructorInput,
    {
      explicitCanonicalComment: DescriptiveBlockComment | null;
    },
  ]
>;

export const { FileParsedCommentGroupInstance } = buildNamedConstructorFunction(
  {
    constructorName: 'FileParsedCommentGroupInstance' as const,
    instancePropertyNameTuple: [
      // keep this as a multiline list
      'zorn',
      'filePath',
      'list',
      'fileComment',
      'explicitCanonicalComment',
    ] as const satisfies readonly (keyof FileParsedCommentGroup)[],
  },
)
  .withTypes<FileParsedCommentGroupConstructorInput, FileParsedCommentGroup>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { filePath, list } = input;

      const zorn = new FileParsedCommentGroupZorn({
        filePath,
      });

      const explicitCanonicalComment =
        list.find(
          (comment): comment is DescriptiveBlockComment =>
            comment.typeName === CategorizedCommentTypeName.Descriptive &&
            comment.tagIdSet.has(CommentTagId.ExplicitCanonicalComment),
        ) ?? null;

      return {
        zorn,
        ...input,
        explicitCanonicalComment,
      } satisfies FileParsedCommentGroup;
    },
  })
  .assemble();

export const FILE_PARSED_COMMENT_GROUP_GEPP = 'file-parsed-comment-group';

type FileParsedCommentGroupGepp = typeof FILE_PARSED_COMMENT_GROUP_GEPP;

export type FileParsedCommentGroupVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    FileParsedCommentGroupGepp,
    FileParsedCommentGroup
  >;
