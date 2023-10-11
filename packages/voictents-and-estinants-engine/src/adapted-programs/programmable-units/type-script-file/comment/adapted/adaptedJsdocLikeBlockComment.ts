import { TSESTree } from '@typescript-eslint/typescript-estree';
import * as commentParser from 'comment-parser';
import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { CommentZorn } from '../commentZorn';
import { AdaptedCommentTypeName } from './adaptedCommentTypeName';

type AdaptedJsdocLikeBlockCommentConstructorInput = {
  filePath: string;
  rawComment: TSESTree.BlockComment;
  parsedBlock: commentParser.Block;
};

/**
 * Metadata about a block comment that can be parsed as a jsdoc-like comment
 */
export type AdaptedJsdocLikeBlockComment = {
  typeName: AdaptedCommentTypeName.JsdocLikeBlock;
  zorn: CommentZorn;
  startingLineNumber: number;
  endingLineNumber: number;
  parsedBlock: commentParser.Block;
  filePath: string;
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
      'filePath',
      'rawComment',
    ] as const satisfies readonly (keyof AdaptedJsdocLikeBlockComment)[],
  })
    .withTypes<
      AdaptedJsdocLikeBlockCommentConstructorInput,
      AdaptedJsdocLikeBlockComment
    >({
      typeCheckErrorMessage: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { filePath, rawComment, parsedBlock } = input;

        return {
          typeName: AdaptedCommentTypeName.JsdocLikeBlock,
          zorn: CommentZorn.build(input),
          startingLineNumber: rawComment.loc.start.line,
          endingLineNumber: rawComment.loc.end.line,
          parsedBlock,
          filePath,
          rawComment,
        } satisfies AdaptedJsdocLikeBlockComment;
      },
    })
    .assemble();
