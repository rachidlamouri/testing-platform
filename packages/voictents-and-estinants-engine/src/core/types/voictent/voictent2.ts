import { Tuple } from '../../../package-agnostic-utilities/type/tuple';
import {
  HubblepupPelieLanbe,
  ItemStream2,
  CollectionStream,
} from '../lanbe/lanbe';
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
  TRestrictingVoque extends GenericStreamMetatype,
  TVoque extends TRestrictingVoque,
> = {
  get collectionId(): TVoque['collectionId'];
  createCollectionStream(debugName: string): CollectionStream<TVoque> | null;
  createCollectionItemStream(
    debugName: string,
  ): ItemStream2<TRestrictingVoque, TVoque> | HubblepupPelieLanbe | null;
  onTickStart(): void;
  /**
   * This is for collections whose constructor accepts initial hubblepups. This
   * allows you to defer adding the initial hubblepups to the collection until
   * the engine starts running. This way, all hubblepups are added to their
   * collections with the proper error handling in place.
   */
  initialize(): void;
  get isEmpty(): boolean;
  addItem(hubblepup: TVoque['itemEggStreamable']): void;
};

export type GenericVoictent2 = Collection2<
  GenericStreamMetatype,
  GenericStreamMetatype
>;

export type GenericVoictent2Tuple = Tuple<GenericVoictent2>;

type UnsafeVoictent2 = Collection2<UnsafeStreamMetatype, UnsafeStreamMetatype>;

export type UnsafeVoictent2Tuple = Tuple<UnsafeVoictent2>;
