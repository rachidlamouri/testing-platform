import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/namedConstructorFunctionBuilder';
import { CommentZorn } from '../commentZorn';
import { AdaptedLineComment } from '../adapted/adaptedLineComment';
import { CategorizedCommentTypeName } from './categorizedCommentTypeName';

export enum CustomDirectiveTypeName {
  NoOperation = 'NoOperation',
  MultilineKeep = 'MultilineKeep',
}

const descriptionByDirectiveTypeName = {
  [CustomDirectiveTypeName.NoOperation]:
    'Signifies an intentionally empty block of code.',
  [CustomDirectiveTypeName.MultilineKeep]:
    'Prevents the formatter from condensing a short list down to one line.',
} satisfies Record<CustomDirectiveTypeName, string>;

type CustomDirectiveCommentConstructorInput = {
  adaptedComment: AdaptedLineComment;
  subtypeName: CustomDirectiveTypeName;
};

export type CustomDirectiveComment = {
  typeName: CategorizedCommentTypeName.CustomDirective;
  zorn: CommentZorn;
  subtypeName: CustomDirectiveTypeName;
  directiveDescription: string;
  text: string;
  startingLineNumber: number;
  endingLineNumber: number;
};

export const { CustomDirectiveCommentInstance } = buildNamedConstructorFunction(
  {
    constructorName: 'CustomDirectiveCommentInstance' as const,
    instancePropertyNameTuple: [
      // multiline-keep
      'typeName',
      'zorn',
      'subtypeName',
      'directiveDescription',
      'text',
      'startingLineNumber',
      'endingLineNumber',
    ] as const satisfies readonly (keyof CustomDirectiveComment)[],
  },
)
  .withTypes<CustomDirectiveCommentConstructorInput, CustomDirectiveComment>({
    typeCheckErrorMesssages: {
      initialization: '',
      instancePropertyNameTuple: {
        missingProperties: '',
        extraneousProperties: '',
      },
    },
    transformInput: (input) => {
      const { adaptedComment, subtypeName } = input;

      return {
        typeName: CategorizedCommentTypeName.CustomDirective,
        zorn: adaptedComment.zorn,
        subtypeName,
        directiveDescription: descriptionByDirectiveTypeName[subtypeName],
        text: adaptedComment.text,
        startingLineNumber: adaptedComment.lineNumber,
        endingLineNumber: adaptedComment.lineNumber,
      } satisfies CustomDirectiveComment;
    },
  })
  .assemble();
