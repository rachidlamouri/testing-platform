import { ZornTuple } from '../utilities/semantic-types/zorn';
import { Gepp } from './gepp';

/**
 * A cache of right Zorn tuples by their respective Gepps.
 * This helps the engine find the identifiers for a specific right collection.
 */
export class Mabz extends Map<Gepp, ZornTuple> {}

export type MabzEntry = [Gepp, ZornTuple];
