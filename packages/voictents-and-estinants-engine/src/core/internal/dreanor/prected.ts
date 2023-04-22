import { Zorn } from '../../../utilities/semantic-types/zorn';
import { Hubblepup } from '../../engine-shell/quirm/hubblepup';

/**
 * A cache of Hubblepups by Zorn
 * This contains the information that the engine needs to know if a Cology has all of the expected inputs
 */
export class Prected extends Map<Zorn, Hubblepup> {}
