import { Simplify } from 'type-fest';
import { Item } from '../hubblepup/hubblepup';
import { GenericVoque, StreamMetatype } from '../voque/voque';
import { ReferenceTypeName } from './referenceTypeName';

export enum StreamTypeName {
  CollectionStream = 'VoictentPelieLanbe',
  HubblepupPelieLanbe = 'HubblepupPelieLanbe',
  ItemStream2 = 'HubblepupPelieLanbe2',
}

type BaseLanbe<
  TLanbeTypeName extends StreamTypeName,
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

export type CollectionStream<TVoque extends GenericVoque> = Simplify<
  BaseLanbe<
    StreamTypeName.CollectionStream,
    ReferenceTypeName.Collection,
    TVoque['voictentPelie']
  > & {
    isAccumulating: () => boolean;
  }
>;

export type GenericVoictentPelieLanbe = CollectionStream<GenericVoque>;

export type HubblepupPelieLanbe = BaseLanbe<
  StreamTypeName.HubblepupPelieLanbe,
  ReferenceTypeName.HubblepupPelie,
  Item
>;

export type ItemStream2<
  TRestrictingVoque extends GenericVoque,
  TVoque extends TRestrictingVoque,
> = BaseLanbe<
  StreamTypeName.ItemStream2,
  ReferenceTypeName.IndexedItem,
  StreamMetatype<
    TVoque['gepp'],
    TVoque['hubblepupPelue'],
    TVoque['hubblepupPelie'],
    TRestrictingVoque['indexByName'],
    TRestrictingVoque['voictentPelie']
  >['indexedHubblepupPelie']
>;

export type GenericCollectionItemStream2 = ItemStream2<
  GenericVoque,
  GenericVoque
>;

/**
 * A data structure that facilitates streaming streamables,
 * including streaming an entire collection at once. It encapsulates stream
 * operations on a collection. This allows an external entity to read a
 * collection without needing a direct reference to it.
 *
 * @readableName Stream
 */
export type Lanbe =
  | GenericVoictentPelieLanbe
  | HubblepupPelieLanbe
  | GenericCollectionItemStream2;
