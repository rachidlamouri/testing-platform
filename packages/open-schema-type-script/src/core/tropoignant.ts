import { GeppTuple } from './gepp';
import { Hubblepup, HubblepupTuple } from './hubblepup';
import { QuirmTuple } from './quirm';

export enum TropoignantTypeName {
  Onama = 'Onama',
  Wortinator = 'Wortinator',
  Mentursection = 'Mentursection',
}

type BaseTropoignant<
  TTropoignantTypeName extends TropoignantTypeName,
  TInput extends readonly unknown[],
  TOuput,
> = {
  typeName: TTropoignantTypeName;
  process: (...inputs: TInput) => TOuput;
};

/**
 * A Tropoignant that creates an output Quirm tuple for every input Hubblepup
 */
export type Onama<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = BaseTropoignant<
  TropoignantTypeName.Onama,
  [input: TInputHubblepup],
  TOutputQuirmTuple
>;

/**
 * A Tropoignant that consumes Hubblepups. This is useful for logging and for performing side effects.
 */
export type Wortinator<TInputHubblepup extends Hubblepup = Hubblepup> =
  BaseTropoignant<
    TropoignantTypeName.Wortinator,
    [input: TInputHubblepup],
    void
  >;

/**
 * A Tropoignant that applies zero or more additional Gepps to a Quirm
 */
export type Mentursection<TInputHubblepup extends Hubblepup = Hubblepup> =
  BaseTropoignant<
    TropoignantTypeName.Mentursection,
    [input: TInputHubblepup],
    GeppTuple
  >;

/**
 * The thing that a Programmer creates to process a Hubblepup. The engine manages them at runtime.
 */
export type Tropoignant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> =
  | Onama<TInputHubblepup, TOutputQuirmTuple>
  | Wortinator<TInputHubblepup>
  | Mentursection<TInputHubblepup>;

/**
 * The thing that a Programmer creates to process one or more Hubblepups. The engine manages them at runtime.
 * This is also a Cortmum: a many to many Tropoignant
 */
export type Tropoignant2<
  TInputHubblepupTuple extends HubblepupTuple = HubblepupTuple,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = (...inputs: TInputHubblepupTuple) => TOutputQuirmTuple;
