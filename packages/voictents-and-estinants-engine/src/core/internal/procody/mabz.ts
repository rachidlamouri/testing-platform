import { ZornTuple } from '../../../utilities/semantic-types/zorn';
import { RightDreanor } from '../dreanor/dreanor';

/**
 * A cache of right Zorn tuples by their respective Dreanors.
 * This helps the engine find the identifiers for a specific right collection.
 */
export class Mabz extends Map<RightDreanor, ZornTuple> {}

export type MabzEntry = [RightDreanor, ZornTuple];
