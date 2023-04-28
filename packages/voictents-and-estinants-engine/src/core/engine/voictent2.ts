import { Straline } from '../../utilities/semantic-types/straline';
import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import {
  VoictentLanbe,
  VoictentItemLanbe,
  VoictentItemLanbe2,
} from '../engine-shell/voictent/lanbe';

export type Voictent2<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
  TIndex extends Straline,
> = {
  get gepp(): TGepp;
  createVoictentLanbe(debugName: string): VoictentLanbe;
  createVoictentItemLanbe(
    debugName: string,
  ): VoictentItemLanbe2<THubblepup, TIndex> | VoictentItemLanbe;
  onTickStart(): void;
  addHubblepup(hubblepup: THubblepup): void;
};

export type GenericVoictent = Voictent2<Gepp, Hubblepup, Straline>;
