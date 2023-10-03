import { Zorn } from '../../../package-agnostic-utilities/datastructure/zorn';
import { Hubblepup } from '../../types/hubblepup/hubblepup';

/**
 * A cache of streamables keyed by id. This allows the engine to know if every
 * id in a transform input id group has a corresponding streamable.
 *
 * @readableName StreamableCache
 */
export class Prected extends Map<Zorn, Hubblepup> {}
