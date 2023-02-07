import { Hubblepup } from './hubblepup';
import { QuirmTuple } from './quirm';

export enum TropoignantTypeName {
  Onama = 'Onama',
  Wortinator = 'Wortinator',
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

// /**
//  * Rudimentary two to one cross product signature
//  */
// export type Cortmum = (inputA: unknown, inputB: unknown) => unknown;

// /**
//  * Rudimentary filter signature
//  */
// export type Mentursection = (input: unknown) => unknown;

// /**
//  * The things that process information within an open-schema engine
//  */
// export type Troporigniant = Onama | Cortmum | Mentursection | Wortinator;

/**
 * The thing that a Programmer creates to process a Hubblepup. The engine manages them at runtime.
 */
export type Tropoignant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = Onama<TInputHubblepup, TOutputQuirmTuple> | Wortinator<TInputHubblepup>;
