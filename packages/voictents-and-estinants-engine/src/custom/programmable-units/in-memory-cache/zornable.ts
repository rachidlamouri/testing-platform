import { Merge } from 'type-fest';
import { Voque } from '../../../core/engine/voque';
import { AbstractSerializableIndexByName } from '../../../example-programs/abstractSerializableVoictent';
import { Gepp } from '../../../type-script-adapter/gepp';
import { Hubblepup } from '../../adapter/hubblepup';

export type Zornable = {
  zorn: string;
};

export type ZornableIndexByName = Merge<
  AbstractSerializableIndexByName,
  Zornable
>;

export type ZornableVoque<
  TGepp extends Gepp,
  TReceivedHubblepup extends Hubblepup,
  TEmittedHubblepup extends Hubblepup,
  TEmittedVoictent,
> = Voque<
  TGepp,
  TReceivedHubblepup,
  TEmittedHubblepup,
  ZornableIndexByName,
  TEmittedVoictent
>;

export type GenericZornableVoque = ZornableVoque<
  Gepp,
  Hubblepup,
  Hubblepup,
  unknown
>;