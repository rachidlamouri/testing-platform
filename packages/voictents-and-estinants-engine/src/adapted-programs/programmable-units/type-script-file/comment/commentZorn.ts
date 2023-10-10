import { TSESTree } from '@typescript-eslint/typescript-estree';
import {
  GenericComplexzornTemplate,
  Complexzorn,
} from '../../../../package-agnostic-utilities/data-structure/zorn';

type CommentZornContext = {
  filePath: string;
  rawComment: TSESTree.Comment;
};

const COMMENT_ZORN_TEMPLATE = [
  'filePath',
  'lineNumber',
] as const satisfies GenericComplexzornTemplate;
type CommentZornTemplate = typeof COMMENT_ZORN_TEMPLATE;

/**
 * The complex identifier for a comment
 *
 * @readableName CommentComplexId
 */
export class CommentZorn extends Complexzorn<CommentZornTemplate> {
  static build({ filePath, rawComment }: CommentZornContext): CommentZorn {
    return new CommentZorn({
      filePath,
      lineNumber: `${rawComment.loc.start.line}`,
    });
  }

  get rawTemplate(): CommentZornTemplate {
    return COMMENT_ZORN_TEMPLATE;
  }
}
