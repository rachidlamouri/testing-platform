import {
  StreamTypeName,
  ItemStream2,
  CollectionStream,
} from '../../../core/types/stream/stream';
import { ReferenceTypeName } from '../../../core/types/stream/referenceTypeName';
import { Collection2 } from '../../../core/types/collection/collection2';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { InMemoryCache } from './inMemoryCache';

type AbstractInMemoryVoictent2ConstructorInput<
  TVoque extends GenericStreamMetatype,
> = {
  gepp: TVoque['collectionId'];
  initialHubblepupPelueTuple: TVoque['itemEggStreamable'][];
};

/**
 * The base class for in memory collections. It supports asymmetric collections
 * (collections where the pelue and pelie are different) since that means it can
 * also support symmetric collections.
 *
 * @readableName AbstractAsymmetricInMemoryCollection
 */
export abstract class AbstractAsymmetricInMemoryVoictent2<
    TRestrictingVoque extends GenericStreamMetatype,
    TVoque extends TRestrictingVoque,
  >
  extends InMemoryCache<TVoque['itemStreamable']>
  implements Collection2<TRestrictingVoque, TVoque>
{
  public readonly collectionId: TVoque['collectionId'];

  private initialHubblepupPelueTuple: TVoque['itemStreamable'][];

  constructor({
    gepp,
    initialHubblepupPelueTuple,
  }: AbstractInMemoryVoictent2ConstructorInput<TVoque>) {
    super();

    this.collectionId = gepp;
    this.initialHubblepupPelueTuple = initialHubblepupPelueTuple;
  }

  initialize(): void {
    this.initialHubblepupPelueTuple.forEach((hubblepup) => {
      this.addItem(hubblepup);
    });
  }

  addItem(hubblepup: TVoque['itemEggStreamable']): void {
    const transformedHubblepup = this.transformHubblepup(hubblepup);
    this.addDatum(transformedHubblepup);
    this.onTransformedHubblepup(
      transformedHubblepup,
      this.datumTuple.length - 1,
    );
  }

  protected abstract transformHubblepup(
    hubblepup: TVoque['itemEggStreamable'],
  ): TVoque['itemStreamable'];

  protected abstract getIndexByName(
    hubblepup: TVoque['itemStreamable'],
  ): TVoque['indexByName'];

  protected abstract onTransformedHubblepup(
    hubblepup: TVoque['itemStreamable'],
    index: number,
  ): void;

  createCollectionStream(debugName: string): CollectionStream<TVoque> {
    const lanbe: CollectionStream<TVoque> = {
      typeName: StreamTypeName.CollectionStream,
      debugName,
      hasNext: () => {
        return this.didStopAccumulating;
      },
      isAccumulating: () => {
        return this.isAccumulating;
      },
      advance: () => {},
      dereference: () => {
        return {
          typeName: ReferenceTypeName.Collection,
          value: [...this.datumTuple],
        };
      },
    };

    return lanbe;
  }

  createCollectionItemStream(
    debugName: string,
  ): ItemStream2<TRestrictingVoque, TVoque> {
    const pointer = this.createPointer(debugName);

    const lanbe: ItemStream2<TRestrictingVoque, TVoque> = {
      typeName: StreamTypeName.ItemStream2,
      debugName,
      hasNext: () => {
        return pointer.hasNext();
      },
      advance: () => {
        pointer.advance();
      },
      dereference: () => {
        const item = pointer.dereference();

        const indexedHubblepup = {
          indexByName: this.getIndexByName(item),
          item,
        };

        return {
          typeName: ReferenceTypeName.IndexedItem,
          value: indexedHubblepup,
        };
      },
    };

    return lanbe;
  }
}
