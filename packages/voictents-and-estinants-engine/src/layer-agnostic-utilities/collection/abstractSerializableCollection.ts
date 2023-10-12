import { CollectionId } from '../../core/types/voictent/gepp';
import { Collection2 } from '../../core/types/voictent/voictent2';
import { StreamMetatype } from '../../core/types/stream-metatype/streamMetatype';
import { GenericItem, Item } from '../../core/types/hubblepup/hubblepup';
import { ProgramFileCache, SerializedItem } from '../program/programFileCache';

export type AbstractSerializableIndexByName = {
  serializableId: string;
};

export type AbstractSerializable = {
  sourceCollectionId: string;
  serializableId: string;
  datum: unknown;
};

export type GenericAbstractSerializableSourceStreamMetatype = StreamMetatype<
  CollectionId,
  Item,
  Item,
  AbstractSerializableIndexByName,
  unknown
>;

export type AbstractSerializableStreamMetatype<
  TCollectionId extends CollectionId,
  TCollection = unknown,
> = StreamMetatype<
  TCollectionId,
  AbstractSerializable,
  AbstractSerializable,
  AbstractSerializableIndexByName,
  TCollection
>;

export type GenericAbstractSerializableStreamMetatype =
  AbstractSerializableStreamMetatype<CollectionId>;

export type IndexedAbstractSerializable =
  GenericAbstractSerializableStreamMetatype['indexedItemStreamable'];

type AbstractSerializableCollectionConstructorInput<
  TStreamMetatype extends GenericAbstractSerializableStreamMetatype,
> = {
  collectionId: TStreamMetatype['collectionId'];
  programFileCache: ProgramFileCache;
  initialItemEggTuple: TStreamMetatype['itemEggStreamable'][];
};

/**
 * A collection that can take a serializeable hubblepup and write it to a
 * program file cache.
 *
 * @readableName AbstractSerializableCollection
 *
 * @canonicalDeclaration
 */
export abstract class AbstractSerializableCollection<
  TStreamMetatype extends GenericAbstractSerializableStreamMetatype,
> implements
    Collection2<GenericAbstractSerializableStreamMetatype, TStreamMetatype>
{
  public readonly collectionId: TStreamMetatype['collectionId'];

  public readonly programFileCache: ProgramFileCache;

  private initialItemEggTuple: TStreamMetatype['itemStreamable'][];

  public readonly duplicateCountByCheckId = new Map<string, number>();

  private hasReceivedItem = false;

  constructor({
    collectionId,
    programFileCache,
    initialItemEggTuple,
  }: AbstractSerializableCollectionConstructorInput<TStreamMetatype>) {
    this.collectionId = collectionId;
    this.programFileCache = programFileCache;
    this.initialItemEggTuple = initialItemEggTuple;
  }

  initialize(): void {
    this.programFileCache.deleteCollectionDirectory({
      collectionCollectionId: this.collectionId,
    });

    this.initialItemEggTuple.forEach((item) => {
      this.addItem(item);
    });
  }

  get isEmpty(): boolean {
    return !this.hasReceivedItem;
  }

  // eslint-disable-next-line class-methods-use-this
  createCollectionStream(): null {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  createCollectionItemStream(): null {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  onTickStart(): void {
    // no op
  }

  addItem(metaitem: AbstractSerializable): void {
    this.hasReceivedItem = true;

    const metacollectionCollectionId = this.collectionId;
    const serializedItemCollectionId = metaitem.sourceCollectionId;
    const extensionlessFileName = metaitem.serializableId.replaceAll(
      '/',
      ' | ',
    );
    const serializedItem = this.serialize(metaitem.datum);

    const duplicateCheckId = `${serializedItemCollectionId}:${extensionlessFileName}`;
    const previousCount =
      this.duplicateCountByCheckId.get(duplicateCheckId) ?? 0;

    const nextCount = previousCount + 1;
    this.duplicateCountByCheckId.set(duplicateCheckId, nextCount);

    if (nextCount > 1) {
      const fileName = this.programFileCache.getNamespacedCollectionsFilePath({
        collectionCollectionId: metacollectionCollectionId,
        nestedPath: serializedItemCollectionId,
        extensionlessFileName,
        fileExtensionSuffixIdentifier:
          serializedItem.fileExtensionSuffixIdentifier,
      });

      const error = new Error(`Duplicate file name: ${fileName}`);
      Object.assign(error, {
        collectionCollectionId: metacollectionCollectionId,
        nestedPath: serializedItemCollectionId,
        extensionlessFileName,
        fileExtensionSuffixIdentifier:
          serializedItem.fileExtensionSuffixIdentifier,
      });

      throw error;

      // eslint-disable-next-line no-console
      console.log();
    } else {
      this.programFileCache.writeSerializedItem({
        collectionCollectionId: metacollectionCollectionId,
        nestedPath: serializedItemCollectionId,
        extensionlessFileName,
        serializedItem,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected serialize(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    item: GenericItem,
  ): SerializedItem {
    throw Error('Not implemented');
  }
}
