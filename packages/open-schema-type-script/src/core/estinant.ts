import { Gipp } from './gipp';
import { Hubblepup } from './hubblepup';
import { QuirmTuple } from './quirm';
import { Tropoignant } from './tropoignant';

/**
 * One of the two programmable units of the Engine (see Quirm).
 * It allows the Progammer to register a Tropoignant to a Voictent via a Gipp.
 */
export type Estinant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = {
  tropoignant: Tropoignant<TInputHubblepup, TOutputQuirmTuple>;
  inputGipp: Gipp;
};

export type EstinantTuple<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = readonly Estinant<TInputHubblepup, TOutputQuirmTuple>[];
