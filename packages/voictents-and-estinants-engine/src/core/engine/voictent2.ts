import {
  VoictentItemLanbe,
  VoictentItemLanbe2,
  VoictentLanbe,
} from '../engine-shell/voictent/lanbe';
import { GenericVoque } from './voque';

export type Voictent2<TVoque extends GenericVoque> = {
  get gepp(): TVoque['gepp'];
  createVoictentLanbe(debugName: string): VoictentLanbe | null;
  createVoictentItemLanbe(
    debugName: string,
  ): VoictentItemLanbe2<TVoque> | VoictentItemLanbe | null;
  onTickStart(): void;
  addHubblepup(hubblepup: TVoque['receivedHubblepup']): void;
};

export type GenericVoictent2 = Voictent2<GenericVoque>;
