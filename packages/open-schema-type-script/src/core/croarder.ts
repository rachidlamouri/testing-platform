import { Quirm } from './quirm';
import { Zorn } from './zorn';

/**
 * A function that converts a Quirm to an identifying Zorn.
 * This is used by the Engine to associate Quirms from different Voictents when processing Estinants with multiple inputs.
 */
export type Croarder<TInputQuirm extends Quirm, TZorn extends Zorn> = (
  hubblepup: TInputQuirm,
) => TZorn;
