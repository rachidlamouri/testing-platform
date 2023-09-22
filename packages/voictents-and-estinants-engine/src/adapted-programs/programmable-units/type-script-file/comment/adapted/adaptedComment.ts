import { AdaptedJsdocLikeBlockComment } from './adaptedJsdocLikeBlockComment';
import { AdaptedLineComment } from './adaptedLineComment';
import { AdaptedNormalBlockComment } from './adaptedNormalBlockComment';

export type AdaptedComment =
  | AdaptedLineComment
  | AdaptedNormalBlockComment
  | AdaptedJsdocLikeBlockComment;
