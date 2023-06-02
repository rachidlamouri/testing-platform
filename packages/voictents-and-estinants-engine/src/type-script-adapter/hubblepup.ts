import { Hubblepup as CoreHubblepup } from '../core/engine-shell/quirm/hubblepup';

export type Hubblepup<THubblepup extends CoreHubblepup = CoreHubblepup> =
  THubblepup;
