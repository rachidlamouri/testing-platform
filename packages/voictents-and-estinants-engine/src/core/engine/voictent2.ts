import { Tuple } from '../../utilities/semantic-types/tuple';
import {
  VoictentItemLanbe,
  VoictentItemLanbe2,
  VoictentLanbe,
} from '../engine-shell/voictent/lanbe';
import { GenericVoque, UnsafeVoque } from './voque';

export type Voictent2<
  TRestrictingVoque extends GenericVoque,
  TVoque extends TRestrictingVoque,
> = {
  get gepp(): TVoque['gepp'];
  createVoictentLanbe(debugName: string): VoictentLanbe | null;
  createVoictentItemLanbe(
    debugName: string,
  ): VoictentItemLanbe2<TRestrictingVoque, TVoque> | VoictentItemLanbe | null;
  onTickStart(): void;
  initialize(): void;
  get isEmpty(): boolean;
  addHubblepup(hubblepup: TVoque['receivedHubblepup']): void;
};

export type GenericVoictent2 = Voictent2<GenericVoque, GenericVoque>;

export type GenericVoictent2Tuple = Tuple<GenericVoictent2>;

type UnsafeVoictent2 = Voictent2<UnsafeVoque, UnsafeVoque>;

export type UnsafeVoictent2Tuple = Tuple<UnsafeVoictent2>;
