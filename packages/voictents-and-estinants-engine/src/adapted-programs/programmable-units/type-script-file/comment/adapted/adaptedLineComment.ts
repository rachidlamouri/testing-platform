import { TSESTree } from '@typescript-eslint/typescript-estree';
import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { CommentZorn } from '../commentZorn';
import { AdaptedCommentTypeName } from './adaptedCommentTypeName';

type AdaptedLineCommentConstructorInput = {
  filePath: string;
  rawComment: TSESTree.LineComment;
};

export type AdaptedLineComment = {
  typeName: AdaptedCommentTypeName.Line;
  zorn: CommentZorn;
  text: string;
  lineNumber: number;
  startingLineNumber: number;
  endingLineNumber: number;
  rawComment: TSESTree.LineComment;
};

export const { AdaptedLineCommentInstance } = buildNamedConstructorFunction({
  constructorName: 'AdaptedLineCommentInstance' as const,
  instancePropertyNameTuple: [
    // multiline-keep
    'typeName',
    'zorn',
    'text',
    'lineNumber',
    'startingLineNumber',
    'endingLineNumber',
    'rawComment',
  ] as const satisfies readonly (keyof AdaptedLineComment)[],
})
  .withTypes<AdaptedLineCommentConstructorInput, AdaptedLineComment>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { rawComment } = input;
      const lineNumber = rawComment.loc.start.line;

      return {
        typeName: AdaptedCommentTypeName.Line,
        zorn: CommentZorn.build(input),
        // eslint-side-effect spaced-comment
        text: rawComment.value.slice(1),
        lineNumber,
        startingLineNumber: lineNumber,
        endingLineNumber: lineNumber,
        rawComment,
      } satisfies AdaptedLineComment;
    },
  })
  .assemble();
