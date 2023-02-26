import { HubblepupTuple } from './hubblepup';
import { QuirmTuple } from './quirm';

/**
 * The thing that a Programmer creates to process one or more Quirms. The engine manages them at runtime.
 */
export type Tropoignant = (...inputs: HubblepupTuple) => QuirmTuple;
