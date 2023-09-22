import { CustomDirectiveComment } from './customDirectiveComment';
import { DescriptiveBlockComment } from './descriptiveBlockComment';
import { EslintDirectiveComment } from './eslintDirectiveComment';
import { InformativeComment } from './informativeComment';
import { UnknownComment } from './unknownComment';

export type CategorizedComment =
  | CustomDirectiveComment
  | DescriptiveBlockComment
  | EslintDirectiveComment
  | InformativeComment
  | UnknownComment;
