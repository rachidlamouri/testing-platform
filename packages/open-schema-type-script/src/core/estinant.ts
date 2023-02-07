import { Gepp } from './gepp';
import { Hubblepup } from './hubblepup';
import { QuirmTuple } from './quirm';
import { Onama, Tropoignant, Wortinator } from './tropoignant';

type BaseEstinant<
  TInputHubblepup extends Hubblepup,
  TOutputQuirmTuple extends QuirmTuple,
  TTropoignant extends Tropoignant<TInputHubblepup, TOutputQuirmTuple>,
> = {
  inputGepp: Gepp;
  tropoignant: TTropoignant;
};

export type OnamaEstinant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = BaseEstinant<
  TInputHubblepup,
  TOutputQuirmTuple,
  Onama<TInputHubblepup, TOutputQuirmTuple>
>;

export type WortinatorEstinant<TInputHubblepup extends Hubblepup = Hubblepup> =
  BaseEstinant<TInputHubblepup, [], Wortinator<TInputHubblepup>>;

/**
 * One of the two programmable units of the Engine (see Quirm).
 * It allows the Progammer to register a Tropoignant to a Voictent via a Gepp.
 */
export type Estinant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> =
  | OnamaEstinant<TInputHubblepup, TOutputQuirmTuple>
  | WortinatorEstinant<TInputHubblepup>;

export type EstinantTuple<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = readonly Estinant<TInputHubblepup, TOutputQuirmTuple>[];
