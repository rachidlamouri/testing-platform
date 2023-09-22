import { TSESTree } from '@typescript-eslint/typescript-estree';
import { buildNamedConstructorFunction } from '../../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { AdaptedCommentTypeName } from './adaptedCommentTypeName';
import { CommentZorn } from '../commentZorn';

type AdaptedNormalBlockCommentConstructorInput = {
  filePath: string;
  rawComment: TSESTree.BlockComment;
};

export type AdaptedNormalBlockComment = {
  typeName: AdaptedCommentTypeName.NormalBlock;
  zorn: CommentZorn;
  text: string;
  startingLineNumber: number;
  endingLineNumber: number;
  isSingleLine: boolean;
  rawComment: TSESTree.BlockComment;
};

export const { AdaptedNormalBlockCommentInstance } =
  buildNamedConstructorFunction({
    constructorName: 'AdaptedNormalBlockCommentInstance' as const,
    instancePropertyNameTuple: [
      // multiline-keep
      'typeName',
      'zorn',
      'text',
      'startingLineNumber',
      'endingLineNumber',
      'isSingleLine',
      'rawComment',
    ] as const satisfies readonly (keyof AdaptedNormalBlockComment)[],
  })
    .withTypes<
      AdaptedNormalBlockCommentConstructorInput,
      AdaptedNormalBlockComment
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { rawComment } = input;

        const startingLineNumber = rawComment.loc.start.line;
        const endingLineNumber = rawComment.loc.end.line;

        return {
          typeName: AdaptedCommentTypeName.NormalBlock,
          zorn: CommentZorn.build(input),
          text: rawComment.value,
          startingLineNumber,
          endingLineNumber,
          isSingleLine: startingLineNumber === endingLineNumber,
          rawComment,
        } satisfies AdaptedNormalBlockComment;
      },
    })
    .assemble();