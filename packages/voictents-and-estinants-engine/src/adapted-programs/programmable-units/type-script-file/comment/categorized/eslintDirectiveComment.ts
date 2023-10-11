import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { AdaptedLineComment } from '../adapted/adaptedLineComment';
import { AdaptedNormalBlockComment } from '../adapted/adaptedNormalBlockComment';
import { CategorizedCommentTypeName } from './categorizedCommentTypeName';
import { CommentZorn } from '../commentZorn';

type EslintDirectiveCommentConstructorInput = {
  adaptedComment: AdaptedLineComment | AdaptedNormalBlockComment;
};

/**
 * Such as "eslint-disable foo" or "eslint-disable-next-line"
 */
export type EslintDirectiveComment = {
  typeName: CategorizedCommentTypeName.EslintDirective;
  zorn: CommentZorn;
  text: string;
  startingLineNumber: number;
  endingLineNumber: number;
};

export const { EslintDirectiveCommentInstance } = buildNamedConstructorFunction(
  {
    constructorName: 'EslintDirectiveCommentInstance' as const,
    instancePropertyNameTuple: [
      // multiline-keep
      'typeName',
      'zorn',
      'text',
      'startingLineNumber',
      'endingLineNumber',
    ] as const satisfies readonly (keyof EslintDirectiveComment)[],
  },
)
  .withTypes<EslintDirectiveCommentConstructorInput, EslintDirectiveComment>({
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
        typeName: CategorizedCommentTypeName.EslintDirective,
        zorn: adaptedComment.zorn,
        text: adaptedComment.text,
        startingLineNumber: adaptedComment.startingLineNumber,
        endingLineNumber: adaptedComment.endingLineNumber,
      } satisfies EslintDirectiveComment;
    },
  })
  .assemble();
