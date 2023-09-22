import fs from 'fs';
import { posix } from 'path';
import { Grition } from '../../adapter/grition';
import { Gepp } from '../engine-shell/voictent/gepp';
import { Voque } from './voque';
import { Voictent2 } from './voictent2';
import {
  LanbeTypeName,
  HubblepupPelieLanbe2,
  VoictentPelieLanbe,
} from '../engine-shell/voictent/lanbe';
import { Json, jsonUtils } from '../../utilities/json';
import {
  MissingLanbeError,
  HubblepupPelueState,
} from './abstractInMemoryVoictent';
import { AbstractSerializableIndexByName } from '../../example-programs/abstractSerializableVoictent';
import { ReferenceTypeName } from '../engine-shell/voictent/referenceTypeName';

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
  zorn: string;
  lastModified: string;
  grition: T;
};

export type CacheableAccessor<TGrition extends Grition> = BaseCacheable<
  () => TGrition
>;

type CachedCacheable<TGrition extends Grition> = BaseCacheable<TGrition>;

type CachedOnDiskIndexByName = AbstractSerializableIndexByName;

export type CachedOnDiskVoque<
  TGepp extends Gepp,
  TGrition extends Json,
> = Voque<
  TGepp,
  CacheableAccessor<TGrition>,
  CachedCacheable<TGrition>,
  CachedOnDiskIndexByName,
  CachedCacheable<TGrition>[]
>;

type GenericCachedOnDiskVoque = CachedOnDiskVoque<Gepp, Json>;

type CachedOnDiskVoictentConstructorInput<
  TVoque extends GenericCachedOnDiskVoque,
> = {
  nameSpace: string;
  gepp: TVoque['gepp'];
};

export class CachedOnDiskVoictent<TVoque extends GenericCachedOnDiskVoque>
  implements Voictent2<GenericCachedOnDiskVoque, TVoque>
{
  public readonly nameSpace: string;

  public readonly gepp: TVoque['gepp'];

  hubblepupTuple: TVoque['voictentPelie'] = [];

  indicesByLanbe: Map<
    HubblepupPelieLanbe2<GenericCachedOnDiskVoque, TVoque>,
    number
  > = new Map();

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size - 1;
  }

  private hubblepupPelue: HubblepupPelueState = {
    twoTicksAgo: false,
    oneTickAgo: false,
    thisTick: null,
  };

  constructor({
    nameSpace,
    gepp,
  }: CachedOnDiskVoictentConstructorInput<TVoque>) {
    this.nameSpace = nameSpace;
    this.gepp = gepp;
  }

  // eslint-disable-next-line class-methods-use-this
  initialize(): void {
    // no op
  }

  get isEmpty(): boolean {
    return this.hubblepupTuple.length === 0;
  }

  addHubblepup(hubblepupPelue: TVoque['hubblepupPelue']): void {
    this.hubblepupPelue.thisTick = true;

    const directoryPath = posix.join(ROOT_DIRECTORY, this.nameSpace, this.gepp);
    createDirectory(directoryPath);

    const fileName = `${hubblepupPelue.zorn}.json`;

    const filePath = posix.join(directoryPath, fileName);

    let currentCachedHubblepup: TVoque['hubblepupPelie'] | null;
    if (fs.existsSync(filePath)) {
      const cachedText = fs.readFileSync(filePath, 'utf8');
      currentCachedHubblepup = jsonUtils.parse(
        cachedText,
      ) as TVoque['hubblepupPelie'];
    } else {
      currentCachedHubblepup = null;
    }

    let hubblepupPelie: TVoque['hubblepupPelie'];
    if (
      currentCachedHubblepup === null ||
      hubblepupPelue.lastModified > currentCachedHubblepup.lastModified
    ) {
      hubblepupPelie = {
        ...hubblepupPelue,
        grition: hubblepupPelue.grition(),
      };

      const nextCachedText = jsonUtils.multilineSerialize(hubblepupPelie);
      fs.writeFileSync(filePath, nextCachedText);
    } else {
      hubblepupPelie = currentCachedHubblepup;
    }

    this.hubblepupTuple.push(hubblepupPelie);
  }

  onTickStart(): void {
    // eslint-disable-next-line prefer-destructuring
    this.hubblepupPelue = {
      twoTicksAgo: this.hubblepupPelue.oneTickAgo,
      oneTickAgo: this.hubblepupPelue.thisTick ?? false,
      thisTick: null,
    };
  }

  get didStopAccumulating(): boolean {
    return this.hubblepupPelue.twoTicksAgo && !this.hubblepupPelue.oneTickAgo;
  }

  createVoictentLanbe(debugName: string): VoictentPelieLanbe<TVoque> {
    const lanbe: VoictentPelieLanbe<TVoque> = {
      typeName: LanbeTypeName.VoictentPelieLanbe,
      debugName,
      hasNext: () => {
        return this.didStopAccumulating;
      },
      isAccumulating: () => {
        return (
          this.hubblepupPelue.twoTicksAgo ||
          this.hubblepupPelue.oneTickAgo ||
          (this.hubblepupPelue.thisTick ?? false)
        );
      },
      advance: () => {},
      dereference: () => {
        return {
          typeName: ReferenceTypeName.VoictentPelie,
          value: [...this.hubblepupTuple],
        };
      },
    };

    return lanbe;
  }

  createVoictentItemLanbe(
    debugName: string,
  ): HubblepupPelieLanbe2<GenericCachedOnDiskVoque, TVoque> {
    const lanbe: HubblepupPelieLanbe2<GenericCachedOnDiskVoque, TVoque> = {
      typeName: LanbeTypeName.HubblepupPelieLanbe2,
      debugName,
      hasNext: () => {
        return this.hasNext(lanbe);
      },
      advance: () => {
        this.advance(lanbe);
      },
      dereference: () => {
        const value = this.dereference(lanbe);

        return {
          typeName: ReferenceTypeName.IndexedHubblepupPelie,
          value,
        };
      },
    };

    this.indicesByLanbe.set(lanbe, CachedOnDiskVoictent.minimumInclusiveIndex);
    return lanbe;
  }

  private getLanbeIndex(
    lanbe: HubblepupPelieLanbe2<GenericCachedOnDiskVoque, TVoque>,
  ): number {
    const index = this.indicesByLanbe.get(lanbe);

    if (index === undefined) {
      throw new MissingLanbeError(lanbe);
    }

    return index;
  }

  get size(): number {
    return this.hubblepupTuple.length;
  }

  private hasNext(
    lanbe: HubblepupPelieLanbe2<GenericCachedOnDiskVoque, TVoque>,
  ): boolean {
    const currentIndex = this.getLanbeIndex(lanbe);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(
    lanbe: HubblepupPelieLanbe2<GenericCachedOnDiskVoque, TVoque>,
  ): void {
    if (this.hasNext(lanbe)) {
      const currentIndex = this.getLanbeIndex(lanbe);
      this.indicesByLanbe.set(lanbe, currentIndex + 1);
    }
  }

  private dereference(
    lanbe: HubblepupPelieLanbe2<GenericCachedOnDiskVoque, TVoque>,
  ): TVoque['indexedHubblepupPelie'] {
    const listIndex = this.getLanbeIndex(lanbe);

    if (listIndex === CachedOnDiskVoictent.minimumInclusiveIndex) {
      throw Error('There is nothing to reference');
    }

    const hubblepup = this.hubblepupTuple[listIndex];
    return {
      hubblepup,
      indexByName: {
        serializableId: hubblepup.zorn,
      },
    };
  }
}
