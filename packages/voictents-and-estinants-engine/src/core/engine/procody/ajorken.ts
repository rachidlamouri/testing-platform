import { Deprecatedzorn } from '../../../package-agnostic-utilities/data-structure/zorn';
import { CologySet } from './cology';

/**
 * A set of transform input key groups keyed by item key (can be a left or right item key).
 * This lets the engine find any transform input key group that might be ready for
 * processing whenever an element of that input groups changes. A left
 * item will only ever be part of one input group, but a right item
 * can be part of multiple input groups.
 *
 * @todo Fact check that last sentence about left stremables only being in one group
 *
 * @readableName TransformInputKeyGroupSetCache
 */
export class Ajorken extends Map<Deprecatedzorn, CologySet> {}
