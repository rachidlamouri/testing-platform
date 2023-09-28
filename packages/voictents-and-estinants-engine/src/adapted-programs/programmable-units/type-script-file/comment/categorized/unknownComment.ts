import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../../package-agnostic-utilities/type/simplify';
import { CategorizedCommentTypeName } from './categorizedCommentTypeName';
import { CommentZorn } from '../commentZorn';
import { AdaptedComment } from '../adapted/adaptedComment';

type UnknownCommentConstructorInput = {
  adaptedComment: AdaptedComment;
};

export type UnknownComment = SimplifyN<
  [
    {
      typeName: CategorizedCommentTypeName.Unknown;
      zorn: CommentZorn;
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
    'zorn',
    'startingLineNumber',
    'endingLineNumber',
    'adaptedComment',
  ] as const satisfies readonly (keyof UnknownComment)[],
})
  .withTypes<UnknownCommentConstructorInput, UnknownComment>({
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
        typeName: CategorizedCommentTypeName.Unknown,
        zorn: adaptedComment.zorn,
        startingLineNumber: adaptedComment.startingLineNumber,
        endingLineNumber: adaptedComment.endingLineNumber,
        adaptedComment,
      } satisfies UnknownComment;
    },
  })
  .assemble();
