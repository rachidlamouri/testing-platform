import {
  StreamTypeName,
  ItemStream2,
  CollectionStream,
} from '../../../core/types/stream/stream';
import { ReferenceTypeName } from '../../../core/types/stream/referenceTypeName';
import { Collection2 } from '../../../core/types/collection/collection2';
import { GenericStreamMetatype } from '../../../core/types/stream-metatype/streamMetatype';
import { InMemoryCache } from './inMemoryCache';

type AbstractInMemoryCollection2ConstructorInput<
  TStreamMetatype extends GenericStreamMetatype,
> = {
  collectionId: TStreamMetatype['collectionId'];
  initialItemEggTuple: TStreamMetatype['itemEggStreamable'][];
};

/**
 * The base class for in memory collections. It supports asymmetric collections
 * (collections where the item egg streamable and item streamable are different) since that means it can
 * also support symmetric collections.
 *
 * @readableName AbstractAsymmetricInMemoryCollection
 *
 * @canonicalDeclaration
 */
export abstract class AbstractAsymmetricInMemoryCollection2<
    TRestrictingStreamMetatype extends GenericStreamMetatype,
    TStreamMetatype extends TRestrictingStreamMetatype,
  >
  extends InMemoryCache<TStreamMetatype['itemStreamable']>
  implements Collection2<TRestrictingStreamMetatype, TStreamMetatype>
{
  public readonly collectionId: TStreamMetatype['collectionId'];

  private initialItemEggTuple: TStreamMetatype['itemStreamable'][];

  constructor({
    collectionId,
    initialItemEggTuple,
  }: AbstractInMemoryCollection2ConstructorInput<TStreamMetatype>) {
    super();

    this.collectionId = collectionId;
    this.initialItemEggTuple = initialItemEggTuple;
  }

  initialize(): void {
    this.initialItemEggTuple.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item: TStreamMetatype['itemEggStreamable']): void {
    const transformedItem = this.transformItem(item);
    this.addDatum(transformedItem);
    this.onTransformedItem(transformedItem, this.datumTuple.length - 1);
  }

  protected abstract transformItem(
    item: TStreamMetatype['itemEggStreamable'],
  ): TStreamMetatype['itemStreamable'];

  protected abstract getIndexByName(
    item: TStreamMetatype['itemStreamable'],
  ): TStreamMetatype['indexByName'];

  protected abstract onTransformedItem(
    item: TStreamMetatype['itemStreamable'],
    index: number,
  ): void;

  createCollectionStream(debugName: string): CollectionStream<TStreamMetatype> {
    const stream: CollectionStream<TStreamMetatype> = {
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

    return stream;
  }

  createCollectionItemStream(
    debugName: string,
  ): ItemStream2<TRestrictingStreamMetatype, TStreamMetatype> {
    const pointer = this.createPointer(debugName);

    const stream: ItemStream2<TRestrictingStreamMetatype, TStreamMetatype> = {
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

        const indexedItem = {
          indexByName: this.getIndexByName(item),
          item,
        };

        return {
          typeName: ReferenceTypeName.IndexedItem,
          value: indexedItem,
        };
      },
    };

    return stream;
  }
}
