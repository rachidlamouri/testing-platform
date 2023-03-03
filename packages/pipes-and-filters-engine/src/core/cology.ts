import { Hubblepup } from './hubblepup';
import { Mabz } from './mabz';

/**
 * A left Hubblepup and a respective Mabz
 */
export type Cology = {
  leftHubblepup: Hubblepup;
  mabz: Mabz;
};

export class CologySet extends Set<Cology> {}
