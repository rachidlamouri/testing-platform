import { InMemoryOdeshin2ListVoque } from '../../../../../core/engine/inMemoryOdeshinVoictent2';
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
      } satisfies InformativeComment;
    },
  })
  .assemble();

export const INFORMATIVE_COMMENT_GEPP = 'informative-comment';

type InformativeCommentGepp = typeof INFORMATIVE_COMMENT_GEPP;

export type InformativeCommentVoque = InMemoryOdeshin2ListVoque<
  InformativeCommentGepp,
  InformativeComment
>;
