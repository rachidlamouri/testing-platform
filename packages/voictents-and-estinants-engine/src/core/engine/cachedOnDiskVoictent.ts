import fs from 'fs';
import { posix } from 'path';
import { Grition } from '../../custom/adapter/grition';
import { GenericGepp } from '../engine-shell/voictent/gepp';
import { Voque } from './voque';
import { Voictent2 } from './voictent2';
import {
  LanbeTypeName,
  ReferenceTypeName,
  VoictentItemLanbe2,
  VoictentLanbe,
} from '../engine-shell/voictent/lanbe';
import { Json, jsonUtils } from '../../utilities/json';
import {
  MissingLanbeError,
  ReceivedHubblepupState,
} from './abstractInMemoryVoictent';
import { AbstractSerializableIndexByName } from '../../example-programs/abstractSerializableVoictent';

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
  TGepp extends GenericGepp,
  TGrition extends Json,
> = Voque<
  TGepp,
  CacheableAccessor<TGrition>,
  CachedCacheable<TGrition>,
  CachedOnDiskIndexByName,
  CachedCacheable<TGrition>[]
>;

type GenericCachedOnDiskVoque = CachedOnDiskVoque<GenericGepp, Json>;

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

  hubblepupTuple: TVoque['emittedVoictent'] = [];

  indicesByLanbe: Map<
    VoictentItemLanbe2<GenericCachedOnDiskVoque, TVoque>,
    number
  > = new Map();

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size - 1;
  }

  private receivedHubblepup: ReceivedHubblepupState = {
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

  addHubblepup(receivedHubblepup: TVoque['receivedHubblepup']): void {
    this.receivedHubblepup.thisTick = true;

    const directoryPath = posix.join(ROOT_DIRECTORY, this.nameSpace, this.gepp);
    createDirectory(directoryPath);

    const fileName = `${receivedHubblepup.zorn}.json`;

    const filePath = posix.join(directoryPath, fileName);

    let currentCachedHubblepup: TVoque['emittedHubblepup'] | null;
    if (fs.existsSync(filePath)) {
      const cachedText = fs.readFileSync(filePath, 'utf8');
      currentCachedHubblepup = jsonUtils.parse(
        cachedText,
      ) as TVoque['emittedHubblepup'];
    } else {
      currentCachedHubblepup = null;
    }

    let emittedHubblepup: TVoque['emittedHubblepup'];
    if (
      currentCachedHubblepup === null ||
      receivedHubblepup.lastModified > currentCachedHubblepup.lastModified
    ) {
      emittedHubblepup = {
        ...receivedHubblepup,
        grition: receivedHubblepup.grition(),
      };

      const nextCachedText = jsonUtils.multilineSerialize(emittedHubblepup);
      fs.writeFileSync(filePath, nextCachedText);
    } else {
      emittedHubblepup = currentCachedHubblepup;
    }

    this.hubblepupTuple.push(emittedHubblepup);
  }

  onTickStart(): void {
    // eslint-disable-next-line prefer-destructuring
    this.receivedHubblepup = {
      twoTicksAgo: this.receivedHubblepup.oneTickAgo,
      oneTickAgo: this.receivedHubblepup.thisTick ?? false,
      thisTick: null,
    };
  }

  get didStopAccumulating(): boolean {
    return (
      this.receivedHubblepup.twoTicksAgo && !this.receivedHubblepup.oneTickAgo
    );
  }

  createVoictentLanbe(debugName: string): VoictentLanbe {
    const lanbe: VoictentLanbe = {
      typeName: LanbeTypeName.VoictentLanbe,
      debugName,
      hasNext: () => {
        return this.didStopAccumulating;
      },
      isAccumulating: () => {
        return (
          this.receivedHubblepup.twoTicksAgo ||
          this.receivedHubblepup.oneTickAgo ||
          (this.receivedHubblepup.thisTick ?? false)
        );
      },
      advance: () => {},
      dereference: () => {
        return {
          typeName: ReferenceTypeName.Voictent,
          value: [...this.hubblepupTuple],
        };
      },
    };

    return lanbe;
  }

  createVoictentItemLanbe(
    debugName: string,
  ): VoictentItemLanbe2<GenericCachedOnDiskVoque, TVoque> {
    const lanbe: VoictentItemLanbe2<GenericCachedOnDiskVoque, TVoque> = {
      typeName: LanbeTypeName.VoictentItemLanbe2,
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
          typeName: ReferenceTypeName.IndexedVoictentItem,
          value,
        };
      },
    };

    this.indicesByLanbe.set(lanbe, CachedOnDiskVoictent.minimumInclusiveIndex);
    return lanbe;
  }

  private getLanbeIndex(
    lanbe: VoictentItemLanbe2<GenericCachedOnDiskVoque, TVoque>,
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
    lanbe: VoictentItemLanbe2<GenericCachedOnDiskVoque, TVoque>,
  ): boolean {
    const currentIndex = this.getLanbeIndex(lanbe);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(
    lanbe: VoictentItemLanbe2<GenericCachedOnDiskVoque, TVoque>,
  ): void {
    if (this.hasNext(lanbe)) {
      const currentIndex = this.getLanbeIndex(lanbe);
      this.indicesByLanbe.set(lanbe, currentIndex + 1);
    }
  }

  private dereference(
    lanbe: VoictentItemLanbe2<GenericCachedOnDiskVoque, TVoque>,
  ): TVoque['indexedEmittedHubblepup'] {
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
