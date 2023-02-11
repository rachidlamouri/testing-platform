import { Hubblepup } from './hubblepup';
import { Zorn } from './zorn';

/**
 * A function that converts a Hubblepup to an identifying Zorn.
 * This is use by the Engine to associate Hubblepups from different Voictents when processing Estinants with multiple inputs.
 */
export type Croarder<TInputHubblepup extends Hubblepup, TZorn extends Zorn> = (
  hubblepup: TInputHubblepup,
) => TZorn;
