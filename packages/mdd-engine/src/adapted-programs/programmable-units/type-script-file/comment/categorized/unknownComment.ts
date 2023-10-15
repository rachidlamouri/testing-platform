import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { SimplifyN } from '../../../../../package-agnostic-utilities/type/simplify';
import { CategorizedCommentTypeName } from './categorizedCommentTypeName';
import { CommentId } from '../commentId';
import { AdaptedComment } from '../adapted/adaptedComment';

type UnknownCommentConstructorInput = {
  adaptedComment: AdaptedComment;
};

/**
 * The category for uncategorized comments.
 */
export type UnknownComment = SimplifyN<
  [
    {
      typeName: CategorizedCommentTypeName.Unknown;
      id: CommentId;
      startingLineNumber: number;
      endingLineNumber: number;
    },
    UnknownCommentConstructorInput,
  ]
>;

export const { UnknownCommentInstance } = buildNamedConstructorFunction({
  constructorName: 'UnknownCommentInstance' as const,
  instancePropertyNameTuple: [
    // multiline-keep
    'typeName',
    'id',
    'startingLineNumber',
    'endingLineNumber',
    'adaptedComment',
  ] as const satisfies readonly (keyof UnknownComment)[],
})
  .withTypes<UnknownCommentConstructorInput, UnknownComment>({
    typeCheckErrorMessage: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { adaptedComment } = input;

      return {
        typeName: CategorizedCommentTypeName.Unknown,
        id: adaptedComment.id,
        startingLineNumber: adaptedComment.startingLineNumber,
        endingLineNumber: adaptedComment.endingLineNumber,
        adaptedComment,
      } satisfies UnknownComment;
    },
  })
  .assemble();
