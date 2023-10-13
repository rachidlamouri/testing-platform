import { IdTuple } from '../../../package-agnostic-utilities/data-structure/id';
import { RightMutableStreamConnectionState } from '../dreanor/dreanor';

/**
 * A cache of right input id tuples keyed by a reference to their respective stream connections.
 * This helps the engine lookup the inputs on the right side by id.
 *
 * @readableName RightInputKeyTupleCache
 */
export class RightInputKeyTupleCache extends Map<
  RightMutableStreamConnectionState,
  IdTuple
> {}

export type RightInputKeyTupleCacheEntry = [
  RightMutableStreamConnectionState,
  IdTuple,
];
