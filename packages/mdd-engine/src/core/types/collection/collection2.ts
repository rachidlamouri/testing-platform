import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { ItemStream2, CollectionStream } from '../stream/stream';
import {
  GenericStreamMetatype,
  UnsafeStreamMetatype,
} from '../stream-metatype/streamMetatype';

/**
 * The collection interface. All collections must support the interface for
 * creating independent streams even if they don't actually allow streaming
 * data.
 *
 * @readableName Collection
 *
 * @canonicalDeclaration
 *
 * @todo make "addItem" private, and create a stream connection for sending
 * data to a collection
 */
export type Collection2<
  TRestrictingStreamMetatype extends GenericStreamMetatype,
  TStreamMetatype extends TRestrictingStreamMetatype,
> = {
  get collectionId(): TStreamMetatype['collectionId'];
  createCollectionStream(
    debugName: string,
  ): CollectionStream<TStreamMetatype> | null;
  createCollectionItemStream(
    debugName: string,
  ): ItemStream2<TRestrictingStreamMetatype, TStreamMetatype> | null;
  onTickStart(): void;
  /**
   * This is for collections whose constructor accepts initial items. This
   * allows you to defer adding the initial items to the collection until
   * the engine starts running. This way, all items are added to their
   * collections with the proper error handling in place.
   */
  initialize(): void;
  get isEmpty(): boolean;
  addItem(item: TStreamMetatype['itemEggStreamable']): void;
};

export type GenericCollection2 = Collection2<
  GenericStreamMetatype,
  GenericStreamMetatype
>;

export type GenericCollection2Tuple = Tuple<GenericCollection2>;

type UnsafeCollection2 = Collection2<
  UnsafeStreamMetatype,
  UnsafeStreamMetatype
>;

export type UnsafeCollection2Tuple = Tuple<UnsafeCollection2>;
