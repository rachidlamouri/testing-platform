import { TSESTree } from '@typescript-eslint/typescript-estree';
import {
  GenericComplexIdTemplate,
  ComplexId,
} from '../../../../package-agnostic-utilities/data-structure/id';

type CommentIdContext = {
  filePath: string;
  rawComment: TSESTree.Comment;
};

const COMMENT_ID_TEMPLATE = [
  'filePath',
  'lineNumber',
] as const satisfies GenericComplexIdTemplate;
type CommentIdTemplate = typeof COMMENT_ID_TEMPLATE;

/**
 * The complex identifier for a comment
 *
 * @readableName CommentComplexId
 *
 * @canonicalDeclaration
 */
export class CommentId extends ComplexId<CommentIdTemplate> {
  static build({ filePath, rawComment }: CommentIdContext): CommentId {
    return new CommentId({
      filePath,
      lineNumber: `${rawComment.loc.start.line}`,
    });
  }

  get rawTemplate(): CommentIdTemplate {
    return COMMENT_ID_TEMPLATE;
  }
}
