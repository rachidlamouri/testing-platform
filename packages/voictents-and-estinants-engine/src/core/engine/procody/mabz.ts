import { IdTuple } from '../../../package-agnostic-utilities/data-structure/id';
import { RightDreanor } from '../dreanor/dreanor';

/**
 * A cache of right input id tuples keyed by a reference to their respective stream connections.
 * This helps the engine lookup the inputs on the right side by id.
 *
 * @readableName RightInputKeyTupleCache
 */
export class Mabz extends Map<RightDreanor, IdTuple> {}

export type MabzEntry = [RightDreanor, IdTuple];
