import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import {
  VoictentLanbe,
  VoictentItemLanbe,
} from '../engine-shell/voictent/lanbe';

export type Voictent2<TGepp extends Gepp, THubblepup> = {
  get gepp(): TGepp;
  createVoictentLanbe(debugName: string): VoictentLanbe;
  createVoictentItemLanbe(debugName: string): VoictentItemLanbe;
  onTickStart(): void;
  addHubblepup(hubblepup: THubblepup): void;
};

export type GenericVoictent = Voictent2<Gepp, Hubblepup>;
