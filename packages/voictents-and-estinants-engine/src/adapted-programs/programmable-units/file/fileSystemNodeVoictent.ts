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
import { BaseInMemoryOdeshin2Voictent } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

type FileSystemNodeIndexByName = SpreadN<
  [
    InMemoryIndexByName,
    {
      zorn: GenericIdentifiableItem['id'];
      nodePath: string;
    },
  ]
>;

type FileVoictentPelie<THubblepupPelie> = {
  byZorn: Map<string, THubblepupPelie>;
  byNodePath: Map<string, THubblepupPelie>;
  list: THubblepupPelie[];
};

export type FileSystemNodeVoque<
  TGepp extends CollectionId,
  THubblepup extends FileSystemNode,
> = InMemoryStreamMetatype<
  TGepp,
  THubblepup,
  THubblepup,
  FileSystemNodeIndexByName,
  FileVoictentPelie<THubblepup>
>;

export type GenericFileSystemNodeVoque = FileSystemNodeVoque<
  CollectionId,
  FileSystemNode
>;

/**
 * A collection for objects that have the same shape as FileSystemNode. It
 * indexes items with node paths by identifier and node path, and provides these
 * datastructures as the collection streamable
 *
 * @readableName FileSystemNodeCollection
 */
export class FileSystemNodeVoictent<
  TVoque extends GenericFileSystemNodeVoque,
> extends BaseInMemoryOdeshin2Voictent<GenericFileSystemNodeVoque, TVoque> {
  private voictentPelie: TVoque['collectionStreamable'] = {
    byZorn: new Map(),
    byNodePath: new Map(),
    list: [],
  };

  addItem(hubblepup: TVoque['itemEggStreamable']): void {
    this.voictentPelie.byZorn.set(hubblepup.zorn.forHuman, hubblepup);
    this.voictentPelie.byNodePath.set(hubblepup.nodePath.serialized, hubblepup);
    this.voictentPelie.list.push(hubblepup);

    super.addItem(hubblepup);
  }

  protected dereferenceCollection(): TVoque['collectionStreamable'] {
    return this.voictentPelie;
  }

  protected dereferenceItem(
    lanbe: ItemStream2<GenericFileSystemNodeVoque, TVoque>,
  ): TVoque['indexedItemStreamable'] {
    const listIndex = this.getStreamIndex(lanbe);

    if (listIndex === AbstractInMemoryCollection.minimumInclusiveIndex) {
      throw new DereferenceError(lanbe);
    }

    const item = this.itemTuple[listIndex];
    return {
      item,
      indexByName: {
        serializableId: `${listIndex}`,
        listIndex,
        zorn: item.zorn,
        nodePath: item.nodePath.serialized,
      },
    };
  }
}
