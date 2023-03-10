import { Hubblepup, HubblepupTuple } from './hubblepup';
import { QuirmList } from './quirm';

/**
 * The thing that a Programmer creates to process one or more Quirms. The engine manages them at runtime.
 */
export type Tropoignant = (
  leftInput: Hubblepup,
  ...rightInputTuple: HubblepupTuple[]
) => QuirmList;
