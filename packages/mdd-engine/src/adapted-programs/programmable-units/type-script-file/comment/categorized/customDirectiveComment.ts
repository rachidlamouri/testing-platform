import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { CommentId } from '../commentId';
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

/**
 * A line comment that tooling can use to take action (or not take action),
 * against a file
 */
export type CustomDirectiveComment = {
  typeName: CategorizedCommentTypeName.CustomDirective;
  id: CommentId;
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
      'id',
      'subtypeName',
      'directiveDescription',
      'text',
      'startingLineNumber',
      'endingLineNumber',
    ] as const satisfies readonly (keyof CustomDirectiveComment)[],
  },
)
  .withTypes<CustomDirectiveCommentConstructorInput, CustomDirectiveComment>({
    typeCheckErrorMessage: {
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
        id: adaptedComment.id,
        subtypeName,
        directiveDescription: descriptionByDirectiveTypeName[subtypeName],
        text: adaptedComment.text,
        startingLineNumber: adaptedComment.lineNumber,
        endingLineNumber: adaptedComment.lineNumber,
      } satisfies CustomDirectiveComment;
    },
  })
  .assemble();
