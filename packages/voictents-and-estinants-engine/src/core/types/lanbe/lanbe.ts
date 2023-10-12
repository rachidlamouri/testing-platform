import { Simplify } from 'type-fest';
import { Item } from '../hubblepup/hubblepup';
import {
  GenericStreamMetatype,
  StreamMetatype,
} from '../stream-metatype/streamMetatype';
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

export type CollectionStream<TVoque extends GenericStreamMetatype> = Simplify<
  BaseLanbe<
    StreamTypeName.CollectionStream,
    ReferenceTypeName.Collection,
    TVoque['collectionStreamable']
  > & {
    isAccumulating: () => boolean;
  }
>;

export type GenericVoictentPelieLanbe = CollectionStream<GenericStreamMetatype>;

export type ItemStream = BaseLanbe<
  StreamTypeName.HubblepupPelieLanbe,
  ReferenceTypeName.HubblepupPelie,
  Item
>;

export type ItemStream2<
  TRestrictingVoque extends GenericStreamMetatype,
  TVoque extends TRestrictingVoque,
> = BaseLanbe<
  StreamTypeName.ItemStream2,
  ReferenceTypeName.IndexedItem,
  StreamMetatype<
    TVoque['collectionId'],
    TVoque['itemEggStreamable'],
    TVoque['itemStreamable'],
    TRestrictingVoque['indexByName'],
    TRestrictingVoque['collectionStreamable']
  >['indexedItemStreamable']
>;

export type GenericCollectionItemStream2 = ItemStream2<
  GenericStreamMetatype,
  GenericStreamMetatype
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
  | ItemStream
  | GenericCollectionItemStream2;
