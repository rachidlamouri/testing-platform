import { Hubblepup } from './hubblepup';
import { Zorn } from '../utilities/semantic-types/zorn';

/**
 * A function that converts a Hubblepup to an identifying Zorn.
 * This is used by the Engine to associate Hubblepups from different Voictents when processing Estinants with multiple inputs.
 */
export type Croarder = (hubblepup: Hubblepup) => Zorn;
