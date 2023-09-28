import { TSESTree } from '@typescript-eslint/typescript-estree';
import {
  GenericZorn2Template,
  Zorn2,
} from '../../../../package-agnostic-utilities/datastructure/zorn';

type CommentZornContext = {
  filePath: string;
  rawComment: TSESTree.Comment;
};

const COMMENT_ZORN_TEMPLATE = [
  'filePath',
  'lineNumber',
] as const satisfies GenericZorn2Template;
type CommentZornTemplate = typeof COMMENT_ZORN_TEMPLATE;
export class CommentZorn extends Zorn2<CommentZornTemplate> {
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
