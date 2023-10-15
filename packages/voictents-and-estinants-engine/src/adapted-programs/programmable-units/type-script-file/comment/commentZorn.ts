import { TSESTree } from '@typescript-eslint/typescript-estree';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';

type CommentZornContext = {
  filePath: string;
  rawComment: TSESTree.Comment;
};

const COMMENT_ZORN_TEMPLATE = [
  'filePath',
  'lineNumber',
] as const satisfies GenericComplexIdTemplate;
type CommentZornTemplate = typeof COMMENT_ZORN_TEMPLATE;

/**
 * The complex identifier for a comment
 *
 * @readableName CommentComplexId
 *
 * @canonicalDeclaration
 */
export class CommentId extends ComplexId<CommentZornTemplate> {
  static build({ filePath, rawComment }: CommentZornContext): CommentId {
    return new CommentId({
      filePath,
      lineNumber: `${rawComment.loc.start.line}`,
    });
  }

  get rawTemplate(): CommentZornTemplate {
    return COMMENT_ZORN_TEMPLATE;
  }
}
