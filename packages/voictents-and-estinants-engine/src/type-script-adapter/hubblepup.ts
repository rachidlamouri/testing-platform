import { Hubblepup as CoreHubblepup } from '../core/engine-shell/quirm/hubblepup';
import { Dalph } from '../utilities/semantic-types/dalph';
import { Tuple } from '../utilities/semantic-types/tuple';

export type Hubblepup<THubblepup extends CoreHubblepup = CoreHubblepup> =
  THubblepup;

export type HubblepupTuple = Tuple<Hubblepup>;

export type HubblepupTupleTuple = Tuple<HubblepupTuple>;

export type HubblepupDalph<
  THubblepupDalph extends Dalph & Hubblepup = Hubblepup,
> = THubblepupDalph;
