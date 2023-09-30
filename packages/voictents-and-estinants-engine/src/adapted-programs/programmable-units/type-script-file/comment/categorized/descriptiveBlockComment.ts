import { buildNamedConstructorFunction } from '../../../../../package-agnostic-utilities/constructor-function/buildNamedConstructorFunction';
import { AdaptedJsdocLikeBlockComment } from '../adapted/adaptedJsdocLikeBlockComment';
import { CommentZorn } from '../commentZorn';
import { CategorizedCommentTypeName } from './categorizedCommentTypeName';

type DescriptiveBlockCommentConstructorInput = {
  adaptedComment: AdaptedJsdocLikeBlockComment;
  description: string;
};

type TagWithName = {
  tag: string;
  name: string;
};

export type DescriptiveBlockComment = {
  typeName: CategorizedCommentTypeName.Descriptive;
  zorn: CommentZorn;
  description: string;
  tagTuple: TagWithName[];
  tagIdSet: Set<string>;
  startingLineNumber: number;
  endingLineNumber: number;
};

export const { DescriptiveBlockCommentInstance } =
  buildNamedConstructorFunction({
    constructorName: 'DescriptiveBlockCommentInstance' as const,
    instancePropertyNameTuple: [
      // multiline-keep
      'typeName',
      'zorn',
      'description',
      'tagTuple',
      'tagIdSet',
      'startingLineNumber',
      'endingLineNumber',
    ] as const satisfies readonly (keyof DescriptiveBlockComment)[],
  })
    .withTypes<
      DescriptiveBlockCommentConstructorInput,
      DescriptiveBlockComment
    >({
      typeCheckErrorMesssages: {
        initialization: '',
        instancePropertyNameTuple: {
          missingProperties: '',
          extraneousProperties: '',
        },
      },
      transformInput: (input) => {
        const { adaptedComment, description } = input;

        const tagList = adaptedComment.parsedBlock.tags;

        const tagTuple = tagList.map((tag) => {
          return {
            tag: tag.tag,
            name: tag.name,
          };
        });

        const tagIdSet = new Set(
          tagList.map((tag) => {
            return tag.tag;
          }),
        );

        return {
          typeName: CategorizedCommentTypeName.Descriptive,
          zorn: adaptedComment.zorn,
          description,
          tagTuple,
          tagIdSet,
          startingLineNumber: adaptedComment.startingLineNumber,
          endingLineNumber: adaptedComment.endingLineNumber,
        } satisfies DescriptiveBlockComment;
      },
    })
    .assemble();
