import { InMemoryIdentifiableItem3StreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
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

const FILE_PARSED_COMMENT_GROUP_ID_TEMPLATE = [
  'filePath',
] as const satisfies GenericComplexIdTemplate;
type FileParsedCommentGroupIdTemplate =
  typeof FILE_PARSED_COMMENT_GROUP_ID_TEMPLATE;
class FileParsedCommentGroupId extends ComplexId<FileParsedCommentGroupIdTemplate> {
  get rawTemplate(): FileParsedCommentGroupIdTemplate {
    return FILE_PARSED_COMMENT_GROUP_ID_TEMPLATE;
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
      id: FileParsedCommentGroupId;
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
      'id',
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

      const id = new FileParsedCommentGroupId({
        filePath,
      });

      const explicitCanonicalComment =
        list.find(
          (comment): comment is DescriptiveBlockComment =>
            comment.typeName === CategorizedCommentTypeName.Descriptive &&
            comment.tagIdSet.has(CommentTagId.ExplicitCanonicalComment),
        ) ?? null;

      return {
        id,
        ...input,
        explicitCanonicalComment,
      } satisfies FileParsedCommentGroup;
    },
  })
  .assemble();

export const FILE_PARSED_COMMENT_GROUP_COLLECTION_ID =
  'file-parsed-comment-group';

type FileParsedCommentGroupCollectionId =
  typeof FILE_PARSED_COMMENT_GROUP_COLLECTION_ID;

export type FileParsedCommentGroupStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    FileParsedCommentGroupCollectionId,
    FileParsedCommentGroup
  >;
