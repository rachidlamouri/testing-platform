import { Hubblepup } from './hubblepup';
import { QuirmTuple } from './quirm';

/**
 * A Tropoignant that creates an output Quirm tuple for every input Hubblepup
 */
export type Onama<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = (input: TInputHubblepup) => TOutputQuirmTuple;

/**
 * The thing that a Programmer creates to process a Hubblepup. The engine manages them at runtime.
 */
export type Tropoignant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = Onama<TInputHubblepup, TOutputQuirmTuple>;
