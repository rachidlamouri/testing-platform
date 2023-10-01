import { Gepp } from '../../../core/types/voictent/gepp';
import { HubblepupPelieLanbe2 } from '../../../core/types/lanbe/lanbe';
import {
  AbstractInMemoryVoictent,
  DereferenceError,
} from '../../../layer-agnostic-utilities/voictent/abstractInMemoryVoictent';
import {
  InMemoryIndexByName,
  InMemoryVoque,
} from '../../../layer-agnostic-utilities/voque/inMemoryVoque';
import { SpreadN } from '../../../package-agnostic-utilities/type/spreadN';
import { GenericOdeshin2 } from '../../../adapter/odeshin/odeshin2';
import { FileSystemNode } from './fileSystemNode';
import { BaseInMemoryOdeshin2Voictent } from '../../../layer-agnostic-utilities/voictent/inMemoryOdeshinVoictent2';

type FileSystemNodeIndexByName = SpreadN<
  [
    InMemoryIndexByName,
    {
      zorn: GenericOdeshin2['zorn'];
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
  TGepp extends Gepp,
  THubblepup extends FileSystemNode,
> = InMemoryVoque<
  TGepp,
  THubblepup,
  THubblepup,
  FileSystemNodeIndexByName,
  FileVoictentPelie<THubblepup>
>;

export type GenericFileSystemNodeVoque = FileSystemNodeVoque<
  Gepp,
  FileSystemNode
>;

/**
 * A collection for objects that have the same shape as FileSystemNode. It
 * indexes streamables by identifier and node path, and provides these
 * datastructures as the collection streamable
 */
export class FileSystemNodeVoictent<
  TVoque extends GenericFileSystemNodeVoque,
> extends BaseInMemoryOdeshin2Voictent<GenericFileSystemNodeVoque, TVoque> {
  private voictentPelie: TVoque['voictentPelie'] = {
    byZorn: new Map(),
    byNodePath: new Map(),
    list: [],
  };

  addHubblepup(hubblepup: TVoque['hubblepupPelue']): void {
    this.voictentPelie.byZorn.set(hubblepup.zorn.forHuman, hubblepup);
    this.voictentPelie.byNodePath.set(hubblepup.nodePath.serialized, hubblepup);
    this.voictentPelie.list.push(hubblepup);

    super.addHubblepup(hubblepup);
  }

  protected dereferenceVoictentPelie(): TVoque['voictentPelie'] {
    return this.voictentPelie;
  }

  protected dereferenceHubblepupPelie(
    lanbe: HubblepupPelieLanbe2<GenericFileSystemNodeVoque, TVoque>,
  ): TVoque['indexedHubblepupPelie'] {
    const listIndex = this.getLanbeIndex(lanbe);

    if (listIndex === AbstractInMemoryVoictent.minimumInclusiveIndex) {
      throw new DereferenceError(lanbe);
    }

    const hubblepup = this.hubblepupPelieTuple[listIndex];
    return {
      hubblepup,
      indexByName: {
        serializableId: `${listIndex}`,
        listIndex,
        zorn: hubblepup.zorn,
        nodePath: hubblepup.nodePath.serialized,
      },
    };
  }
}
