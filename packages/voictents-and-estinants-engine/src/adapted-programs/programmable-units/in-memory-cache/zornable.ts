import { Merge } from 'type-fest';
import { Voque } from '../../../core/engine/voque';
import { AbstractSerializableIndexByName } from '../../../core-programs/abstractSerializableVoictent';
import { Gepp } from '../../../core/engine-shell/voictent/gepp';
import { Hubblepup } from '../../../core/engine-shell/quirm/hubblepup';

export type Zornable = {
  zorn: string;
};

type ZornableIndexByName = Merge<AbstractSerializableIndexByName, Zornable>;

export type ZornableVoque<
  TGepp extends Gepp,
  THubblepupPelue extends Hubblepup,
  THubblepupPelie extends Hubblepup,
  TVoictentPelie,
> = Voque<
  TGepp,
  THubblepupPelue,
  THubblepupPelie,
  ZornableIndexByName,
  TVoictentPelie
>;
