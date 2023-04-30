import { Tuple } from '../../utilities/semantic-types/tuple';
import {
  Hubblepup,
  HubblepupIndexByName,
  IndexedHubblepup,
} from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';

export type VoictentConfiguration<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
  IndexByName extends HubblepupIndexByName,
> = {
  gepp: TGepp;
  indexByName: IndexByName;
  hubblepup: THubblepup;
  hubblepupTuple: Tuple<THubblepup>;
  indexedHubblepup: IndexedHubblepup<THubblepup, IndexByName>;
};

export type GenericVoictentConfiguration = VoictentConfiguration<
  Gepp,
  Hubblepup,
  HubblepupIndexByName
>;
