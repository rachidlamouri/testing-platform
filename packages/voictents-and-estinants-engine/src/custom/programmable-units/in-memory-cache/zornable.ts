import { Merge } from 'type-fest';
import { Voque } from '../../../core/engine/voque';
import { AbstractSerializableIndexByName } from '../../../example-programs/abstractSerializableVoictent';
import { GenericGepp } from '../../../core/engine-shell/voictent/gepp';
import { Hubblepup } from '../../../core/engine-shell/quirm/hubblepup';

type Zornable = {
  zorn: string;
};

export type ZornableIndexByName = Merge<
  AbstractSerializableIndexByName,
  Zornable
>;

export type ZornableVoque<
  TGepp extends GenericGepp,
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
