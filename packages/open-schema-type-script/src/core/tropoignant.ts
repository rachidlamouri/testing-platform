import { Hubblepup } from './hubblepup';
import { QuirmTuple } from './quirm';

export enum TropoignantTypeName {
  Onama = 'Onama',
  Gration = 'Gration',
}

/**
 * A Tropoignant that creates an output Hubblepup for every input Hubblepup
 */
export type Onama<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = (input: TInputHubblepup) => TOutputQuirmTuple;

// /**
//  * Rudimentary two to one cross product signature
//  */
// export type Cortmum = (inputA: unknown, inputB: unknown) => unknown;

// /**
//  * Rudimentary filter signature
//  */
// export type Mentursection = (input: unknown) => unknown;

// /**
//  * Rudimentary consumer signatrue
//  */
// export type Wortinator = (input: unknown) => void;

// /**
//  * The things that process information within an open-schema engine
//  */
// export type Troporigniant = Onama | Cortmum | Mentursection | Wortinator;

/**
 * The thing that a programmer creates to process a Hubblepup. The engine manages them at runtime.
 */
export type Tropoignant<
  TInputHubblepup extends Hubblepup = Hubblepup,
  TOutputQuirmTuple extends QuirmTuple = QuirmTuple,
> = Onama<TInputHubblepup, TOutputQuirmTuple>;
