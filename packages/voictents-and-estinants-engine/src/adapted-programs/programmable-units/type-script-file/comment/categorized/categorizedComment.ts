import { CustomDirectiveComment } from './customDirectiveComment';
import { DescriptiveBlockComment } from './descriptiveBlockComment';
import { EslintDirectiveComment } from './eslintDirectiveComment';
import { InformativeComment } from './informativeComment';
import { UnknownComment } from './unknownComment';

/**
 * Proprietary comment metadata that makes it easier to associate comments to
 * code and to incorporate comments with linting
 */
export type CategorizedComment =
  | CustomDirectiveComment
  | DescriptiveBlockComment
  | EslintDirectiveComment
  | InformativeComment
  | UnknownComment;
