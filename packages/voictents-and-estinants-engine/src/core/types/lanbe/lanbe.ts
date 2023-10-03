import { Simplify } from 'type-fest';
import { Hubblepup } from '../hubblepup/hubblepup';
import { GenericVoque, Voque } from '../voque/voque';
import { ReferenceTypeName } from './referenceTypeName';

export enum LanbeTypeName {
  VoictentPelieLanbe = 'VoictentPelieLanbe',
  HubblepupPelieLanbe = 'HubblepupPelieLanbe',
  HubblepupPelieLanbe2 = 'HubblepupPelieLanbe2',
}

type BaseLanbe<
  TLanbeTypeName extends LanbeTypeName,
  TReferenceTypeName extends ReferenceTypeName,
  TOutput,
> = {
  typeName: TLanbeTypeName;
  debugName: string;
  hasNext: () => boolean;
  advance: () => void;
  dereference: () => {
    typeName: TReferenceTypeName;
    value: TOutput;
  };
};

export type VoictentPelieLanbe<TVoque extends GenericVoque> = Simplify<
  BaseLanbe<
    LanbeTypeName.VoictentPelieLanbe,
    ReferenceTypeName.VoictentPelie,
    TVoque['voictentPelie']
  > & {
    isAccumulating: () => boolean;
  }
>;

export type GenericVoictentPelieLanbe = VoictentPelieLanbe<GenericVoque>;

export type HubblepupPelieLanbe = BaseLanbe<
  LanbeTypeName.HubblepupPelieLanbe,
  ReferenceTypeName.HubblepupPelie,
  Hubblepup
>;

export type HubblepupPelieLanbe2<
  TRestrictingVoque extends GenericVoque,
  TVoque extends TRestrictingVoque,
> = BaseLanbe<
  LanbeTypeName.HubblepupPelieLanbe2,
  ReferenceTypeName.IndexedHubblepupPelie,
  Voque<
    TVoque['gepp'],
    TVoque['hubblepupPelue'],
    TVoque['hubblepupPelie'],
    TRestrictingVoque['indexByName'],
    TRestrictingVoque['voictentPelie']
  >['indexedHubblepupPelie']
>;

export type GenericVoictentItemLanbe2 = HubblepupPelieLanbe2<
  GenericVoque,
  GenericVoque
>;

/**
 * A data structure that facilitates streaming streamables from a collection, or
 * streaming the entire collection at once. It encapsulates stream operations on
 * a collection. This allows an external entity to read a collection without
 * needing a direct reference to it.
 *
 * @readableName StreamConnection
 */
export type Lanbe =
  | GenericVoictentPelieLanbe
  | HubblepupPelieLanbe
  | GenericVoictentItemLanbe2;
