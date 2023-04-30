import {
  GenericIndexedHubblepup,
  GenericIndexedHubblepupTuple,
} from '../quirm/hubblepup';
import { QuirmList } from '../quirm/quirm';

/**
 * The thing that a Programmer creates to process one or more Quirms. The engine manages them at runtime.
 */
export type Tropoignant = (
  leftInput: GenericIndexedHubblepup,
  ...rightInputTuple: GenericIndexedHubblepupTuple
) => QuirmList;
