import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import {
  Hubblepup,
  HubblepupIndexByName,
  IndexedHubblepup,
} from '../hubblepup/hubblepup';
import { Gepp } from '../voictent/gepp';

export type Voque<
  TGepp extends Gepp,
  THubblepupPelue extends Hubblepup,
  THubblepupPelie extends Hubblepup,
  IndexByName extends HubblepupIndexByName,
  TVoictentPelie,
> = {
  gepp: TGepp;
  indexByName: IndexByName;
  hubblepupPelue: THubblepupPelue;
  hubblepupPelie: THubblepupPelie;
  indexedHubblepupPelie: IndexedHubblepup<THubblepupPelie, IndexByName>;
  voictentPelie: TVoictentPelie;
};

export type GenericVoque = Voque<
  Gepp,
  Hubblepup,
  Hubblepup,
  HubblepupIndexByName,
  unknown
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnsafeVoque = Voque<any, any, any, any, any>;

export type GenericVoqueTuple = Tuple<GenericVoque>;

export type UnsafeVoqueTuple = Tuple<UnsafeVoque>;
