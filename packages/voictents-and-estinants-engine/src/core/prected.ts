import { Zorn } from '../utilities/semantic-types/zorn';
import { Hubblepup } from './hubblepup';

/** A cache of Hubblepups by Zorn */
export class Prected extends Map<Zorn, Hubblepup> {}
