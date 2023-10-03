import { ZornTuple } from '../../../package-agnostic-utilities/datastructure/zorn';
import { RightDreanor } from '../dreanor/dreanor';

/**
 * A cache of right input id tuples keyed by a reference to their respective stream connections.
 * This helps the engine lookup the inputs on the right side by id.
 *
 * @readableName RightInputIdTupleCache
 */
export class Mabz extends Map<RightDreanor, ZornTuple> {}

export type MabzEntry = [RightDreanor, ZornTuple];
