import { buildNamedConstructorFunction } from '../../../../../utilities/constructor-function/namedConstructorFunctionBuilder';
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

export type InformativeComment = {
  typeName: CategorizedCommentTypeName.Informative;
  zorn: CommentZorn;
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
    'zorn',
    'subtypeName',
    'text',
    'startingLineNumber',
    'endingLineNumber',
  ] as const satisfies readonly (keyof InformativeComment)[],
})
  .withTypes<InformativeCommentConstructorInput, InformativeComment>({
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
        typeName: CategorizedCommentTypeName.Informative,
        zorn: adaptedComment.zorn,
        subtypeName,
        text: adaptedComment.text,
        startingLineNumber: adaptedComment.startingLineNumber,
        endingLineNumber: adaptedComment.endingLineNumber,
      } satisfies InformativeComment;
    },
  })
  .assemble();
