import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import {
  HubblepupPelieLanbe,
  HubblepupPelieLanbe2,
  VoictentPelieLanbe,
} from '../lanbe/lanbe';
import { GenericVoque, UnsafeVoque } from '../voque/voque';

/**
 * The interface to implement when defining a collection for an engine program.
 * All collections must suport the interface for creating independent streams of
 * hubblepups, even if they don't actually allow streaming hubblepups.
 */
export type Voictent2<
  TRestrictingVoque extends GenericVoque,
  TVoque extends TRestrictingVoque,
> = {
  get gepp(): TVoque['gepp'];
  createVoictentLanbe(debugName: string): VoictentPelieLanbe<TVoque> | null;
  createVoictentItemLanbe(
    debugName: string,
  ):
    | HubblepupPelieLanbe2<TRestrictingVoque, TVoque>
    | HubblepupPelieLanbe
    | null;
  onTickStart(): void;
  /**
   * This is for collections whose constructor accepts initial hubblepups. This
   * allows you to defer adding the initial hubblepups to the collection until
   * the engine starts running. This way, all hubblepups are added to their
   * collections with the proper error handling in place.
   */
  initialize(): void;
  get isEmpty(): boolean;
  addHubblepup(hubblepup: TVoque['hubblepupPelue']): void;
};

export type GenericVoictent2 = Voictent2<GenericVoque, GenericVoque>;

export type GenericVoictent2Tuple = Tuple<GenericVoictent2>;

type UnsafeVoictent2 = Voictent2<UnsafeVoque, UnsafeVoque>;

export type UnsafeVoictent2Tuple = Tuple<UnsafeVoictent2>;
