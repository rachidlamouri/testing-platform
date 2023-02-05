import { Hubblepup } from './hubblepup';

/**
 * A Tropoignant that creates an output Hubblepup for every input Hubblepup
 */
export type Onama<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputHubblepup extends Hubblepup = Hubblepup,
> = (input: TInputHubblepup) => TOutputHubblepup;

/**
 * The thing that a programmer creates to process a Hubblepup. The engine manages them at runtime.
 */
export type Tropoignant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputHubblepup extends Hubblepup = Hubblepup,
> = Onama<TInputHubblepup, TOutputHubblepup>;
