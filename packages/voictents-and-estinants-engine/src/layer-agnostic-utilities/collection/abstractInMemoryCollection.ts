import {
  CollectionStream,
  StreamTypeName,
  ItemStream2,
  GenericCollectionItemStream2,
} from '../../core/types/lanbe/lanbe';
import { Collection2 } from '../../core/types/voictent/voictent2';
import { GenericInMemoryStreamMetatype } from '../stream-metatype/inMemoryStreamMetatype';
import { ReferenceTypeName } from '../../core/types/lanbe/referenceTypeName';

export class DereferenceError extends Error {
  constructor(stream: GenericCollectionItemStream2) {
    super(`Lanbe "${stream.debugName}" has nothing to dereference`);
  }
}

export class MissingStreamError extends Error {
  constructor(stream: GenericCollectionItemStream2) {
    super(`Lanbe "${stream.debugName}" does not exist`);
  }
}

export type ItemEggState = {
  twoTicksAgo: boolean;
  oneTickAgo: boolean;
  thisTick: boolean | null;
};

type InMemoryCollectionConstructorInput<
  TStreamMetatype extends GenericInMemoryStreamMetatype,
> = {
  collectionId: TStreamMetatype['collectionId'];
  initialItemEggTuple: TStreamMetatype['itemEggStreamable'][];
};

/**
 * The parent class of any collection that wants to store data in memory
 *
 * @readableName AbstractInMemoryCollection
 *
 * @canonicalDeclaration
 */
export abstract class AbstractInMemoryCollection<
  TRestrictingStreamMetatype extends GenericInMemoryStreamMetatype,
  TStreamMetatype extends TRestrictingStreamMetatype,
> implements Collection2<TRestrictingStreamMetatype, TStreamMetatype>
{
  public readonly collectionId: TStreamMetatype['collectionId'];

  private initialItemEggTuple: TStreamMetatype['itemEggStreamable'][];

  itemTuple: TStreamMetatype['itemStreamable'][] = [];

  indicesByStream: Map<
    ItemStream2<TRestrictingStreamMetatype, TStreamMetatype>,
    number
  > = new Map();

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size - 1;
  }

  private itemEggState: ItemEggState = {
    twoTicksAgo: false,
    oneTickAgo: false,
    thisTick: null,
  };

  constructor({
    collectionId,
    initialItemEggTuple,
  }: InMemoryCollectionConstructorInput<TStreamMetatype>) {
    this.collectionId = collectionId;
    this.initialItemEggTuple = initialItemEggTuple;
  }

  initialize(): void {
    this.initialItemEggTuple.forEach((item) => {
      this.addItem(item);
    });
  }

  get isEmpty(): boolean {
    return this.itemTuple.length === 0;
  }

  addItem(item: TStreamMetatype['itemEggStreamable']): void {
    this.itemEggState.thisTick = true;

    this.itemTuple.push(item);
  }

  onTickStart(): void {
    // eslint-disable-next-line prefer-destructuring
    this.itemEggState = {
      twoTicksAgo: this.itemEggState.oneTickAgo,
      oneTickAgo: this.itemEggState.thisTick ?? false,
      thisTick: null,
    };
  }

  get didStopAccumulating(): boolean {
    return this.itemEggState.twoTicksAgo && !this.itemEggState.oneTickAgo;
  }

  createCollectionStream(debugName: string): CollectionStream<TStreamMetatype> {
    const stream: CollectionStream<TStreamMetatype> = {
      typeName: StreamTypeName.CollectionStream,
      debugName,
      hasNext: () => {
        return this.didStopAccumulating;
      },
      isAccumulating: () => {
        return (
          this.itemEggState.twoTicksAgo ||
          this.itemEggState.oneTickAgo ||
          (this.itemEggState.thisTick ?? false)
        );
      },
      advance: () => {},
      dereference: () => {
        return {
          typeName: ReferenceTypeName.Collection,
          value: this.dereferenceCollection(),
        };
      },
    };

    return stream;
  }

  createCollectionItemStream(
    debugName: string,
  ): ItemStream2<TRestrictingStreamMetatype, TStreamMetatype> {
    const stream: ItemStream2<TRestrictingStreamMetatype, TStreamMetatype> = {
      typeName: StreamTypeName.ItemStream2,
      debugName,
      hasNext: () => {
        return this.hasNext(stream);
      },
      advance: () => {
        this.advance(stream);
      },
      dereference: () => {
        const value = this.dereferenceItem(stream);

        return {
          typeName: ReferenceTypeName.IndexedItem,
          value,
        };
      },
    };

    this.indicesByStream.set(
      stream,
      AbstractInMemoryCollection.minimumInclusiveIndex,
    );
    return stream;
  }

  protected getStreamIndex(
    stream: ItemStream2<TRestrictingStreamMetatype, TStreamMetatype>,
  ): number {
    const index = this.indicesByStream.get(stream);

    if (index === undefined) {
      throw new MissingStreamError(stream);
    }

    return index;
  }

  get size(): number {
    return this.itemTuple.length;
  }

  private hasNext(
    stream: ItemStream2<TRestrictingStreamMetatype, TStreamMetatype>,
  ): boolean {
    const currentIndex = this.getStreamIndex(stream);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(
    stream: ItemStream2<TRestrictingStreamMetatype, TStreamMetatype>,
  ): void {
    if (this.hasNext(stream)) {
      const currentIndex = this.getStreamIndex(stream);
      this.indicesByStream.set(stream, currentIndex + 1);
    }
  }

  protected abstract dereferenceCollection(): TStreamMetatype['collectionStreamable'];

  protected abstract dereferenceItem(
    stream: ItemStream2<TRestrictingStreamMetatype, TStreamMetatype>,
  ): TStreamMetatype['indexedItemStreamable'];
}
