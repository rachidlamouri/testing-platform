import { TSESTree } from '@typescript-eslint/typescript-estree';
import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { CommentId } from '../commentZorn';
import { AdaptedCommentTypeName } from './adaptedCommentTypeName';

type AdaptedLineCommentConstructorInput = {
  filePath: string;
  rawComment: TSESTree.LineComment;
};

/**
 * Metadata about a line comment (the one with two forward slashes)
 */
export type AdaptedLineComment = {
  typeName: AdaptedCommentTypeName.Line;
  id: CommentId;
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
    'id',
    'text',
    'lineNumber',
    'startingLineNumber',
    'endingLineNumber',
    'rawComment',
  ] as const satisfies readonly (keyof AdaptedLineComment)[],
})
  .withTypes<AdaptedLineCommentConstructorInput, AdaptedLineComment>({
    typeCheckErrorMessage: {
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
        id: CommentId.build(input),
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
