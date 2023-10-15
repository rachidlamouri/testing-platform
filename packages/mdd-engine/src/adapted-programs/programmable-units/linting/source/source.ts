import { LeafSource } from './leafSource';
import { RequestSource } from './requestSource';

/**
 * The information needed to locate something. This can be used in many
 * contexts, but is primarily used with linting. For example a rule has a
 * source, something that violates a rule will have a source and something that
 * exempts a source from a rule also has a source.
 *
 * @todo Enforce a comment tag that enumerates all items in the union (including nested items, if possible)
 */
export type Source = LeafSource | RequestSource;
