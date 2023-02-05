import { Gipp } from './gipp';
import { Hubblepup } from './hubblepup';
import { Tropoignant } from './tropoignant';

/**
 * One of the two programmable units of the Engine (see Quirm).
 * It allows the Progammer to register a Tropoignant to a Voictent via a Gipp.
 */
export type Estinant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputHubblepup extends Hubblepup = Hubblepup,
> = {
  tropoignant: Tropoignant<TInputHubblepup, TOutputHubblepup>;
  inputGipp: Gipp;
};

export type EstinantTuple<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputHubblepup extends Hubblepup = Hubblepup,
> = readonly Estinant<TInputHubblepup, TOutputHubblepup>[];
