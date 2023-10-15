import { CollectionId } from '../../../core/types/collection/collectionId';
import { ItemStream2 } from '../../../core/types/stream/stream';
import {
  AbstractInMemoryCollection,
  DereferenceError,
} from '../../../layer-agnostic-utilities/collection/abstractInMemoryCollection';
import {
  InMemoryIndexByName,
  InMemoryStreamMetatype,
} from '../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import { GenericIdentifiableItem } from '../../../adapter/identifiable-item/identifiableItem';
import { FileSystemNode } from './fileSystemNode';
import { BaseInMemoryIdentifiableItem2Collection } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

type FileSystemNodeIndexByName = SpreadN<
  [
    InMemoryIndexByName,
    {
      id: GenericIdentifiableItem['id'];
      nodePath: string;
    },
  ]
>;

type FileCollection<TItem> = {
  byId: Map<string, TItem>;
  byNodePath: Map<string, TItem>;
  list: TItem[];
};

export type FileSystemNodeStreamMetatype<
  TCollectionId extends CollectionId,
  TItem extends FileSystemNode,
> = InMemoryStreamMetatype<
  TCollectionId,
  TItem,
  TItem,
  FileSystemNodeIndexByName,
  FileCollection<TItem>
>;

export type GenericFileSystemNodeStreamMetatype = FileSystemNodeStreamMetatype<
  CollectionId,
  FileSystemNode
>;

/**
 * A collection for objects that have the same shape as FileSystemNode. It
 * indexes items with node paths by identifier and node path, and provides these
 * datastructures as the collection streamable
 *
 * @readableName FileSystemNodeCollection
 *
 * @canonicalDeclaration
 */
export class FileSystemNodeCollection<
  TStreamMetatype extends GenericFileSystemNodeStreamMetatype,
> extends BaseInMemoryIdentifiableItem2Collection<
  GenericFileSystemNodeStreamMetatype,
  TStreamMetatype
> {
  private collection: TStreamMetatype['collectionStreamable'] = {
    byId: new Map(),
    byNodePath: new Map(),
    list: [],
  };

  addItem(item: TStreamMetatype['itemEggStreamable']): void {
    this.collection.byId.set(item.id.forHuman, item);
    this.collection.byNodePath.set(item.nodePath.serialized, item);
    this.collection.list.push(item);

    super.addItem(item);
  }

  protected dereferenceCollection(): TStreamMetatype['collectionStreamable'] {
    return this.collection;
  }

  protected dereferenceItem(
    stream: ItemStream2<GenericFileSystemNodeStreamMetatype, TStreamMetatype>,
  ): TStreamMetatype['indexedItemStreamable'] {
    const listIndex = this.getStreamIndex(stream);

    if (listIndex === AbstractInMemoryCollection.minimumInclusiveIndex) {
      throw new DereferenceError(stream);
    }

    const item = this.itemTuple[listIndex];
    return {
      item,
      indexByName: {
        serializableId: `${listIndex}`,
        listIndex,
        id: item.id,
        nodePath: item.nodePath.serialized,
      },
    };
  }
}
