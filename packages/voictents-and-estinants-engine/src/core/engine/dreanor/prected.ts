import { Zorn } from '../../../package-agnostic-utilities/datastructure/zorn';
import { Hubblepup } from '../../types/hubblepup/hubblepup';

/**
 * A cache of Hubblepups by Zorn
 * This contains the information that the engine needs to know if a Cology has all of the expected inputs
 */
export class Prected extends Map<Zorn, Hubblepup> {}