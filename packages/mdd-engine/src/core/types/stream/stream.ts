import { Simplify } from 'type-fest';
import {
  GenericStreamMetatype,
  StreamMetatype,
} from '../stream-metatype/streamMetatype';
import { ReferenceTypeName } from './referenceTypeName';

export enum StreamTypeName {
  CollectionStream = 'VoictentPelieLanbe',
  ItemStream = 'HubblepupPelieLanbe',
  ItemStream2 = 'HubblepupPelieLanbe2',
}

type BaseStream<
  TStreamTypeName extends StreamTypeName,
  TReferenceTypeName extends ReferenceTypeName,
  TOutput,
> = {
  typeName: TStreamTypeName;
  debugName: string;
  hasNext: () => boolean;
  advance: () => void;
  dereference: () => {
    typeName: TReferenceTypeName;
    value: TOutput;
  };
};

export type CollectionStream<TStreamMetatype extends GenericStreamMetatype> =
  Simplify<
    BaseStream<
      StreamTypeName.CollectionStream,
      ReferenceTypeName.Collection,
      TStreamMetatype['collectionStreamable']
    > & {
      isAccumulating: () => boolean;
    }
  >;

export type GenericCollectionStream = CollectionStream<GenericStreamMetatype>;

export type ItemStream2<
  TRestrictingStreamMetatype extends GenericStreamMetatype,
  TStreamMetatype extends TRestrictingStreamMetatype,
> = BaseStream<
  StreamTypeName.ItemStream2,
  ReferenceTypeName.IndexedItem,
  StreamMetatype<
    TStreamMetatype['collectionId'],
    TStreamMetatype['itemEggStreamable'],
    TStreamMetatype['itemStreamable'],
    // NOTE: I'm not 100% certain that this does what I want it to do. The two last ones used to be "TRestrictingStreamMetatype". Idk if changing the restricting type to the restricted type is a bad thing or not :shrug:
    TStreamMetatype['indexByName'],
    TStreamMetatype['collectionStreamable']
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
export type Stream = GenericCollectionStream | GenericCollectionItemStream2;
