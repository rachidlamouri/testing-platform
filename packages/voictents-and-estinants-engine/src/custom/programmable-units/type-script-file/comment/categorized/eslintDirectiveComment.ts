import { buildNamedConstructorFunction } from '../../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { AdaptedLineComment } from '../adapted/adaptedLineComment';
import { AdaptedNormalBlockComment } from '../adapted/adaptedNormalBlockComment';
import { CategorizedCommentTypeName } from './categorizedCommentTypeName';
import { CommentZorn } from '../commentZorn';

type EslintDirectiveCommentConstructorInput = {
  adaptedComment: AdaptedLineComment | AdaptedNormalBlockComment;
};

export type EslintDirectiveComment = {
  typeName: CategorizedCommentTypeName.EslintDirective;
  zorn: CommentZorn;
  text: string;
  startingLineNumber: number;
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
    ] as const satisfies readonly (keyof EslintDirectiveComment)[],
  },
)
  .withTypes<EslintDirectiveCommentConstructorInput, EslintDirectiveComment>({
    typeCheckErrorMesssages: {
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
      } satisfies EslintDirectiveComment;
    },
  })
  .assemble();
