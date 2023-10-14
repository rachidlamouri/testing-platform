import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { AdaptedLineComment } from '../adapted/adaptedLineComment';
import { CategorizedCommentTypeName } from './categorizedCommentTypeName';
import { CommentZorn } from '../commentZorn';

export enum InformativeCommentTypeName {
  Note = 'Note',
  Todo = 'Todo',
}

type InformativeCommentConstructorInput = {
  adaptedComment: AdaptedLineComment;
  subtypeName: InformativeCommentTypeName;
};

/**
 * A comment with information for developers and an indication of how that
 * information should be used
 */
export type InformativeComment = {
  typeName: CategorizedCommentTypeName.Informative;
  id: CommentZorn;
  subtypeName: InformativeCommentTypeName;
  text: string;
  startingLineNumber: number;
  endingLineNumber: number;
};

export const { InformativeCommentInstance } = buildNamedConstructorFunction({
  constructorName: 'InformativeCommentInstance' as const,
  instancePropertyNameTuple: [
    // multiline-keep
    'typeName',
    'id',
    'subtypeName',
    'text',
    'startingLineNumber',
    'endingLineNumber',
  ] as const satisfies readonly (keyof InformativeComment)[],
})
  .withTypes<InformativeCommentConstructorInput, InformativeComment>({
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
        typeName: CategorizedCommentTypeName.Informative,
        id: adaptedComment.id,
        subtypeName,
        text: adaptedComment.text,
        startingLineNumber: adaptedComment.startingLineNumber,
        endingLineNumber: adaptedComment.endingLineNumber,
      } satisfies InformativeComment;
    },
  })
  .assemble();
