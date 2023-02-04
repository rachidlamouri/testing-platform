import { Gipp } from './gipp';
import { Hubblepup } from './hubblepup';

/**
 * The thing that the engine operates on. It wraps a Hubblepup.
 */
export type Quirm = {
  gippTuple: Gipp[];
  hubblepup: Hubblepup;
};
