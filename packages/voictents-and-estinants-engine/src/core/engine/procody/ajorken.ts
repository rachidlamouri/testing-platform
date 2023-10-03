import { Zorn } from '../../../package-agnostic-utilities/datastructure/zorn';
import { CologySet } from './cology';

/**
 * A set of transform input id groups keyed by streamable id (can be a left or right streamable id).
 * This lets the engine find any transform input id group that might be ready for
 * processing whenever an element of that input groups changes. A left
 * streamable will only ever be part of one input group, but a right streamable
 * can be part of multiple input groups.
 *
 * @todo Fact check that last sentence about left stremables only being in one group
 *
 * @readableName TransformInputIdGroupSetCache
 */
export class Ajorken extends Map<Zorn, CologySet> {}
