import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import { ItemStream, ItemStream2, CollectionStream } from '../lanbe/lanbe';
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
 * @todo make "addHubblepup" private, and create a stream connection for sending
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
  ):
    | ItemStream2<TRestrictingStreamMetatype, TStreamMetatype>
    | ItemStream
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
