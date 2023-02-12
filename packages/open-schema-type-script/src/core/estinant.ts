import { Croarder } from './croarder';
import { Gepp } from './gepp';
import { Hubblepup } from './hubblepup';
import { QuirmTuple, QuirmTupleToGeppTuple } from './quirm';
import { Straline } from './straline';
import {
  Mentursection,
  Onama,
  Tropoignant,
  Tropoignant2,
  Wortinator,
} from './tropoignant';

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

export type MentursectionEstinant<
  TInputHubblepup extends Hubblepup = Hubblepup,
> = BaseEstinant<TInputHubblepup, [], Mentursection<TInputHubblepup>>;

/**
 * One of the two programmable units of the Engine (see Quirm).
 * It allows the Progammer to register a Tropoignant to a Voictent via a Gepp.
 */
export type Estinant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> =
  | OnamaEstinant<TInputHubblepup, TOutputQuirmTuple>
  | WortinatorEstinant<TInputHubblepup>
  | MentursectionEstinant<TInputHubblepup>;

export type EstinantTuple<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = readonly Estinant<TInputHubblepup, TOutputQuirmTuple>[];

/**
 * One of the two programmable units of the Engine (see Quirm).
 * It allows the Progammer to register a Tropoignant to one or more Voictents via a tuple of Gepps.
 */
export type Estinant2<
  TInputQuirmTuple extends QuirmTuple = QuirmTuple,
  TIntersectionIdentity extends Straline = Straline,
> = {
  inputGeppTuple: QuirmTupleToGeppTuple<TInputQuirmTuple>;
  tropoig: Tropoignant2<TInputQuirmTuple>;
  croard: Croarder<TInputQuirmTuple[number], TIntersectionIdentity>;
};

export type Estinant2Tuple<
  TInputQuirmTuple extends QuirmTuple = QuirmTuple,
  TIntersectionIdentity extends Straline = Straline,
> = readonly Estinant2<TInputQuirmTuple, TIntersectionIdentity>[];
