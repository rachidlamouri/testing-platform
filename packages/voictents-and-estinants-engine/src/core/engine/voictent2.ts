import {
  VoictentItemLanbe,
  VoictentItemLanbe2,
  VoictentLanbe,
} from '../engine-shell/voictent/lanbe';
import { GenericVoictentConfiguration } from './voictentConfiguration';

export type Voictent2<
  TVoictentConfiguration extends GenericVoictentConfiguration,
> = {
  get gepp(): TVoictentConfiguration['gepp'];
  createVoictentLanbe(debugName: string): VoictentLanbe | null;
  createVoictentItemLanbe(
    debugName: string,
  ): VoictentItemLanbe2<TVoictentConfiguration> | VoictentItemLanbe | null;
  onTickStart(): void;
  addHubblepup(hubblepup: TVoictentConfiguration['receivedHubblepup']): void;
};

export type GenericVoictent2 = Voictent2<GenericVoictentConfiguration>;
