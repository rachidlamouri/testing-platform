import { Merge } from 'type-fest';
import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import { Voque } from './voque';
import { AbstractSerializableIndexByName } from '../../example-programs/abstractSerializableVoictent';

export type InMemoryIndexByName = Merge<
  AbstractSerializableIndexByName,
  {
    listIndex: number;
  }
>;

export type InMemoryVoque<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
  TIndexByName extends InMemoryIndexByName,
> = Voque<TGepp, THubblepup, THubblepup, TIndexByName, THubblepup[]>;

export type StandardInMemoryVoque<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
> = InMemoryVoque<TGepp, THubblepup, InMemoryIndexByName>;

export type GenericInMemoryVoque = InMemoryVoque<
  Gepp,
  Hubblepup,
  InMemoryIndexByName
>;
