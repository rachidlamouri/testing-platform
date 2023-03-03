import { Hubblepup as CoreHubblepup } from '../core/hubblepup';
import { Dalph } from '../utilities/semantic-types/dalph';

export type Hubblepup<THubblepup extends CoreHubblepup = CoreHubblepup> =
  THubblepup;

export type HubblepupTuple = readonly Hubblepup[];

export type HubblepupDalph<
  THubblepupDalph extends Dalph & Hubblepup = Hubblepup,
> = THubblepupDalph;
