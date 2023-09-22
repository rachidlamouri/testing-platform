import { Merge } from 'type-fest';
import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import { Voque } from './voque';
import { AbstractSerializableIndexByName } from '../../core-programs/abstractSerializableVoictent';

export type InMemoryIndexByName = Merge<
  AbstractSerializableIndexByName,
  {
    listIndex: number;
  }
>;

export type InMemoryVoque<
  TGepp extends Gepp,
  THubblepupPelue extends Hubblepup,
  THubblepupPelie extends Hubblepup,
  TIndexByName extends InMemoryIndexByName,
  TVoictentPelie,
> = Voque<
  TGepp,
  THubblepupPelue,
  THubblepupPelie,
  TIndexByName,
  TVoictentPelie
>;

export type StandardInMemoryVoque<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
> = InMemoryVoque<
  TGepp,
  THubblepup,
  THubblepup,
  InMemoryIndexByName,
  THubblepup[]
>;

export type GenericInMemoryVoque = InMemoryVoque<
  Gepp,
  Hubblepup,
  Hubblepup,
  InMemoryIndexByName,
  unknown
>;
