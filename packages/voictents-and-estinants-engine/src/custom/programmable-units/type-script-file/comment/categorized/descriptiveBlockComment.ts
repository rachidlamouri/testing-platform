import { InMemoryOdeshin2ListVoque } from '../../../../../core/engine/inMemoryOdeshinVoictent2';
import { buildNamedConstructorFunction } from '../../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { AdaptedJsdocLikeBlockComment } from '../adapted/adaptedJsdocLikeBlockComment';
import { CommentZorn } from '../commentZorn';
import { CategorizedCommentTypeName } from './categorizedCommentTypeName';

type DescriptiveBlockCommentConstructorInput = {
  adaptedComment: AdaptedJsdocLikeBlockComment;
  description: string;
};

export type DescriptiveBlockComment = {
  typeName: CategorizedCommentTypeName.Descriptive;
  zorn: CommentZorn;
  description: string;
  startingLineNumber: number;
};

export const { DescriptiveBlockCommentInstance } =
  buildNamedConstructorFunction({
    constructorName: 'DescriptiveBlockCommentInstance' as const,
    instancePropertyNameTuple: [
      // multiline-keep
      'typeName',
      'zorn',
      'description',
      'startingLineNumber',
    ] as const satisfies readonly (keyof DescriptiveBlockComment)[],
  })
    .withTypes<
      DescriptiveBlockCommentConstructorInput,
      DescriptiveBlockComment
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { adaptedComment, description } = input;

        return {
          typeName: CategorizedCommentTypeName.Descriptive,
          zorn: adaptedComment.zorn,
          description,
          startingLineNumber: adaptedComment.startingLineNumber,
        } satisfies DescriptiveBlockComment;
      },
    })
    .assemble();

export const DESCRIPTIVE_BLOCK_COMMENT_GEPP = 'descriptive-block-comment';

type DescriptiveBlockCommentGepp = typeof DESCRIPTIVE_BLOCK_COMMENT_GEPP;

export type DescriptiveBlockCommentVoque = InMemoryOdeshin2ListVoque<
  DescriptiveBlockCommentGepp,
  DescriptiveBlockComment
>;
