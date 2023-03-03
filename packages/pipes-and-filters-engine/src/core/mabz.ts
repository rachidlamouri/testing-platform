import { ZornTuple } from '../utilities/semantic-types/zorn';
import { Gepp } from './gepp';

/**
 * A cache of right Zorn tuples by their respective Gepps
 */
export class Mabz extends Map<Gepp, ZornTuple> {}
