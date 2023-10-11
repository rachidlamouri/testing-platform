import { DeprecatedId } from '../../../package-agnostic-utilities/data-structure/id';
import { Hubblepup } from '../../types/hubblepup/hubblepup';

/**
 * A cache of items keyed by id. This allows the engine to know if every
 * id in a transform input key group has a corresponding item.
 *
 * @readableName ItemCache
 */
export class Prected extends Map<DeprecatedId, Hubblepup> {}
