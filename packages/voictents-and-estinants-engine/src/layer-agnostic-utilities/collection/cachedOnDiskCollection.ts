import fs from 'fs';
import { posix } from 'path';
import { Subitem } from '../../adapter/odeshin/subitem';
import { CollectionId } from '../../core/types/voictent/gepp';
import { StreamMetatype } from '../../core/types/voque/voque';
import { Collection2 } from '../../core/types/voictent/voictent2';
import {
  StreamTypeName,
  ItemStream2,
  CollectionStream,
} from '../../core/types/lanbe/lanbe';
import { Json, jsonUtils } from '../../package-agnostic-utilities/json/json';
import { MissingStreamError, ItemEggState } from './abstractInMemoryCollection';
import { AbstractSerializableIndexByName } from './abstractSerializableCollection';
import { ReferenceTypeName } from '../../core/types/lanbe/referenceTypeName';

const createDirectory = (directoryPath: string): void => {
  if (!fs.existsSync(directoryPath)) {
    // eslint-disable-next-line no-console
    console.log(`NEW: ${directoryPath}`);
  }

  fs.mkdirSync(directoryPath, { recursive: true });
};

// TODO: make the root a generic on-disk cache location that is shared by any on-disk voictent
const ROOT_DIRECTORY = 'debug';
createDirectory(ROOT_DIRECTORY);

type BaseCacheable<T> = {
  id: string;
  lastModified: string;
  subitem: T;
};

export type CacheableAccessor<TSubitem extends Subitem> = BaseCacheable<
  () => TSubitem
>;

type CachedCacheable<TSubitem extends Subitem> = BaseCacheable<TSubitem>;

type CachedOnDiskIndexByName = AbstractSerializableIndexByName;

export type CachedOnDiskStreamMetatype<
  TCollectionId extends CollectionId,
  TSubitem extends Json,
> = StreamMetatype<
  TCollectionId,
  CacheableAccessor<TSubitem>,
  CachedCacheable<TSubitem>,
  CachedOnDiskIndexByName,
  CachedCacheable<TSubitem>[]
>;

type GenericCachedOnDiskStreamMetatype = CachedOnDiskStreamMetatype<
  CollectionId,
  Json
>;

type CachedOnDiskCollectionConstructorInput<
  TStreamMetatype extends GenericCachedOnDiskStreamMetatype,
> = {
  nameSpace: string;
  collectionId: TStreamMetatype['gepp'];
};

/**
 * A collection that takes a CacheableAccessor which can be used to defer
 * acquiring data until it has confirmed it doesn't exist, or not acquiring data
 * if it already exists in the cache.
 *
 * @readableName CachedOnDiskCollection
 *
 * @canonicalDeclaration
 */
export class CachedOnDiskCollection<
  TStreamMetatype extends GenericCachedOnDiskStreamMetatype,
> implements Collection2<GenericCachedOnDiskStreamMetatype, TStreamMetatype>
{
  public readonly nameSpace: string;

  public readonly collectionId: TStreamMetatype['gepp'];

  itemTuple: TStreamMetatype['hubblepupPelie'][] = [];

  indicesByStream: Map<
    ItemStream2<GenericCachedOnDiskStreamMetatype, TStreamMetatype>,
    number
  > = new Map();

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size - 1;
  }

  private itemEgg: ItemEggState = {
    twoTicksAgo: false,
    oneTickAgo: false,
    thisTick: null,
  };

  constructor({
    nameSpace,
    collectionId,
  }: CachedOnDiskCollectionConstructorInput<TStreamMetatype>) {
    this.nameSpace = nameSpace;
    this.collectionId = collectionId;
  }

  // eslint-disable-next-line class-methods-use-this
  initialize(): void {
    // no op
  }

  get isEmpty(): boolean {
    return this.itemTuple.length === 0;
  }

  addItem(itemEgg: TStreamMetatype['hubblepupPelue']): void {
    this.itemEgg.thisTick = true;

    const directoryPath = posix.join(
      ROOT_DIRECTORY,
      this.nameSpace,
      this.collectionId,
    );
    createDirectory(directoryPath);

    const fileName = `${itemEgg.id}.json`;

    const filePath = posix.join(directoryPath, fileName);

    let currentCachedItem: TStreamMetatype['hubblepupPelie'] | null;
    if (fs.existsSync(filePath)) {
      const cachedText = fs.readFileSync(filePath, 'utf8');
      currentCachedItem = jsonUtils.parse(
        cachedText,
      ) as TStreamMetatype['hubblepupPelie'];
    } else {
      currentCachedItem = null;
    }

    let item: TStreamMetatype['hubblepupPelie'];
    if (
      currentCachedItem === null ||
      itemEgg.lastModified > currentCachedItem.lastModified
    ) {
      item = {
        ...itemEgg,
        subitem: itemEgg.subitem(),
      };

      const nextCachedText = jsonUtils.multilineSerialize(item);
      fs.writeFileSync(filePath, nextCachedText);
    } else {
      item = currentCachedItem;
    }

    this.itemTuple.push(item);
  }

  onTickStart(): void {
    // eslint-disable-next-line prefer-destructuring
    this.itemEgg = {
      twoTicksAgo: this.itemEgg.oneTickAgo,
      oneTickAgo: this.itemEgg.thisTick ?? false,
      thisTick: null,
    };
  }

  get didStopAccumulating(): boolean {
    return this.itemEgg.twoTicksAgo && !this.itemEgg.oneTickAgo;
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
          this.itemEgg.twoTicksAgo ||
          this.itemEgg.oneTickAgo ||
          (this.itemEgg.thisTick ?? false)
        );
      },
      advance: () => {},
      dereference: () => {
        return {
          typeName: ReferenceTypeName.Collection,
          value: [...this.itemTuple],
        };
      },
    };

    return stream;
  }

  createCollectionItemStream(
    debugName: string,
  ): ItemStream2<GenericCachedOnDiskStreamMetatype, TStreamMetatype> {
    const stream: ItemStream2<
      GenericCachedOnDiskStreamMetatype,
      TStreamMetatype
    > = {
      typeName: StreamTypeName.ItemStream2,
      debugName,
      hasNext: () => {
        return this.hasNext(stream);
      },
      advance: () => {
        this.advance(stream);
      },
      dereference: () => {
        const value = this.dereference(stream);

        return {
          typeName: ReferenceTypeName.IndexedItem,
          value,
        };
      },
    };

    this.indicesByStream.set(
      stream,
      CachedOnDiskCollection.minimumInclusiveIndex,
    );
    return stream;
  }

  private getStreamIndex(
    stream: ItemStream2<GenericCachedOnDiskStreamMetatype, TStreamMetatype>,
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
    stream: ItemStream2<GenericCachedOnDiskStreamMetatype, TStreamMetatype>,
  ): boolean {
    const currentIndex = this.getStreamIndex(stream);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(
    stream: ItemStream2<GenericCachedOnDiskStreamMetatype, TStreamMetatype>,
  ): void {
    if (this.hasNext(stream)) {
      const currentIndex = this.getStreamIndex(stream);
      this.indicesByStream.set(stream, currentIndex + 1);
    }
  }

  private dereference(
    stream: ItemStream2<GenericCachedOnDiskStreamMetatype, TStreamMetatype>,
  ): TStreamMetatype['indexedHubblepupPelie'] {
    const listIndex = this.getStreamIndex(stream);

    if (listIndex === CachedOnDiskCollection.minimumInclusiveIndex) {
      throw Error('There is nothing to reference');
    }

    const item = this.itemTuple[listIndex];

    return {
      item,
      indexByName: {
        serializableId: item.id,
      },
    };
  }
}
