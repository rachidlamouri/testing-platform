import { TSESTree } from '@typescript-eslint/typescript-estree';
import * as commentParser from 'comment-parser';
import { buildNamedConstructorFunction } from '../../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { CommentZorn } from '../commentZorn';
import { AdaptedCommentTypeName } from './adaptedCommentTypeName';

type AdaptedJsdocLikeBlockCommentConstructorInput = {
  filePath: string;
  rawComment: TSESTree.BlockComment;
  parsedBlock: commentParser.Block;
};

export type AdaptedJsdocLikeBlockComment = {
  typeName: AdaptedCommentTypeName.JsdocLikeBlock;
  zorn: CommentZorn;
  startingLineNumber: number;
  endingLineNumber: number;
  parsedBlock: commentParser.Block;
  rawComment: TSESTree.BlockComment;
};

export const { AdaptedJsdocLikeBlockCommentInstance } =
  buildNamedConstructorFunction({
    constructorName: 'AdaptedJsdocLikeBlockCommentInstance' as const,
    instancePropertyNameTuple: [
      // multiline-keep
      'typeName',
      'zorn',
      'startingLineNumber',
      'endingLineNumber',
      'parsedBlock',
      'rawComment',
    ] as const satisfies readonly (keyof AdaptedJsdocLikeBlockComment)[],
  })
    .withTypes<
      AdaptedJsdocLikeBlockCommentConstructorInput,
      AdaptedJsdocLikeBlockComment
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { rawComment, parsedBlock } = input;

        return {
          typeName: AdaptedCommentTypeName.JsdocLikeBlock,
          zorn: CommentZorn.build(input),
          startingLineNumber: rawComment.loc.start.line,
          endingLineNumber: rawComment.loc.end.line,
          parsedBlock,
          rawComment,
        } satisfies AdaptedJsdocLikeBlockComment;
      },
    })
    .assemble();
