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
      id: GenericIdentifiableItem['id'];
      nodePath: string;
    },
  ]
>;

type FileVoictentPelie<THubblepupPelie> = {
  byId: Map<string, THubblepupPelie>;
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

export type GenericFileSystemNodeStreamMetatype = FileSystemNodeVoque<
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
  TVoque extends GenericFileSystemNodeStreamMetatype,
> extends BaseInMemoryOdeshin2Voictent<
  GenericFileSystemNodeStreamMetatype,
  TVoque
> {
  private voictentPelie: TVoque['collectionStreamable'] = {
    byId: new Map(),
    byNodePath: new Map(),
    list: [],
  };

  addItem(hubblepup: TVoque['itemEggStreamable']): void {
    this.voictentPelie.byId.set(hubblepup.id.forHuman, hubblepup);
    this.voictentPelie.byNodePath.set(hubblepup.nodePath.serialized, hubblepup);
    this.voictentPelie.list.push(hubblepup);

    super.addItem(hubblepup);
  }

  protected dereferenceCollection(): TVoque['collectionStreamable'] {
    return this.voictentPelie;
  }

  protected dereferenceItem(
    lanbe: ItemStream2<GenericFileSystemNodeStreamMetatype, TVoque>,
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
        id: item.id,
        nodePath: item.nodePath.serialized,
      },
    };
  }
}
