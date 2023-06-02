import { Merge } from 'type-fest';
import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { GenericGepp } from '../engine-shell/voictent/gepp';
import { Voque } from './voque';
import { AbstractSerializableIndexByName } from '../../example-programs/abstractSerializableVoictent';

export type InMemoryIndexByName = Merge<
  AbstractSerializableIndexByName,
  {
    listIndex: number;
  }
>;

export type InMemoryVoque<
  TGepp extends GenericGepp,
  TReceivedHubblepup extends Hubblepup,
  TEmittedHubblepup extends Hubblepup,
  TIndexByName extends InMemoryIndexByName,
> = Voque<
  TGepp,
  TReceivedHubblepup,
  TEmittedHubblepup,
  TIndexByName,
  TEmittedHubblepup[]
>;

export type StandardInMemoryVoque<
  TGepp extends GenericGepp,
  THubblepup extends Hubblepup,
> = InMemoryVoque<TGepp, THubblepup, THubblepup, InMemoryIndexByName>;

export type GenericInMemoryVoque = InMemoryVoque<
  GenericGepp,
  Hubblepup,
  Hubblepup,
  InMemoryIndexByName
>;
