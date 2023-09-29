import { Merge } from 'type-fest';
import { Voque } from '../../core/types/voque/voque';
import { AbstractSerializableIndexByName } from '../voictent/abstractSerializableVoictent';
import { Gepp } from '../../core/types/voictent/gepp';
import { Hubblepup } from '../../core/types/hubblepup/hubblepup';

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
