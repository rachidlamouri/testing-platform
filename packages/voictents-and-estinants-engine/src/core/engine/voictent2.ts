import { Tuple } from '../../utilities/semantic-types/tuple';
import {
  HubblepupPelieLanbe,
  HubblepupPelieLanbe2,
  VoictentPelieLanbe,
} from '../engine-shell/voictent/lanbe';
import { GenericVoque, UnsafeVoque } from './voque';

export type Voictent2<
  TRestrictingVoque extends GenericVoque,
  TVoque extends TRestrictingVoque,
> = {
  get gepp(): TVoque['gepp'];
  createVoictentLanbe(debugName: string): VoictentPelieLanbe | null;
  createVoictentItemLanbe(
    debugName: string,
  ):
    | HubblepupPelieLanbe2<TRestrictingVoque, TVoque>
    | HubblepupPelieLanbe
    | null;
  onTickStart(): void;
  initialize(): void;
  get isEmpty(): boolean;
  addHubblepup(hubblepup: TVoque['hubblepupPelue']): void;
};

export type GenericVoictent2 = Voictent2<GenericVoque, GenericVoque>;

export type GenericVoictent2Tuple = Tuple<GenericVoictent2>;

type UnsafeVoictent2 = Voictent2<UnsafeVoque, UnsafeVoque>;

export type UnsafeVoictent2Tuple = Tuple<UnsafeVoictent2>;
