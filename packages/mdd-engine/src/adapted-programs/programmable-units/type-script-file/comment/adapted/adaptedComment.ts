import { AdaptedJsdocLikeBlockComment } from './adaptedJsdocLikeBlockComment';
import { AdaptedLineComment } from './adaptedLineComment';
import { AdaptedNormalBlockComment } from './adaptedNormalBlockComment';

/**
 * Metadata about a comment that helps it categorized using propietary logic
 */
export type AdaptedComment =
  | AdaptedLineComment
  | AdaptedNormalBlockComment
  | AdaptedJsdocLikeBlockComment;
