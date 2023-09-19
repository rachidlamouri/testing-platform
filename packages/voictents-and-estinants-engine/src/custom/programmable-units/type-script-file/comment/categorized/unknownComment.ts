import { buildNamedConstructorFunction } from '../../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
import { SimplifyN } from '../../../../../utilities/simplify';
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
        adaptedComment,
      } satisfies UnknownComment;
    },
  })
  .assemble();
