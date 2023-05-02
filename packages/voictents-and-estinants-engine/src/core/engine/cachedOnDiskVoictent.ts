import fs from 'fs';
import { posix } from 'path';
import { Grition } from '../../custom/adapter/grition';
import { Gepp } from '../engine-shell/voictent/gepp';
import { VoictentConfiguration } from './voictentConfiguration';
import { SerializableIndexByName } from '../../example-programs/serializableVoictent';
import { Voictent2 } from './voictent2';
import {
  LanbeTypeName,
  ReferenceTypeName,
  VoictentItemLanbe2,
  VoictentLanbe,
} from '../engine-shell/voictent/lanbe';
import { MissingLanbeError, ReceivedHubblepupState } from './inMemoryVoictent';
import { Json, jsonUtils } from '../../utilities/json';

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

export type CachedCacheable<TGrition extends Grition> = BaseCacheable<TGrition>;

export type CachedOnDiskIndexByName = SerializableIndexByName;

export type CachedOnDiskVoictentConfiguration<
  TGepp extends Gepp,
  TGrition extends Json,
> = VoictentConfiguration<
  TGepp,
  CacheableAccessor<TGrition>,
  CachedCacheable<TGrition>,
  CachedOnDiskIndexByName,
  CachedCacheable<TGrition>[]
>;

export type GenericCachedOnDiskVoictentConfiguration =
  CachedOnDiskVoictentConfiguration<Gepp, Json>;

export type CachedOnDiskVoictentConstructorInput<
  TVoictentConfiguration extends GenericCachedOnDiskVoictentConfiguration,
> = {
  nameSpace: string;
  gepp: TVoictentConfiguration['gepp'];
};

export class CachedOnDiskVoictent<
  TVoictentConfiguration extends GenericCachedOnDiskVoictentConfiguration,
> implements Voictent2<TVoictentConfiguration>
{
  public readonly nameSpace: string;

  public readonly gepp: TVoictentConfiguration['gepp'];

  hubblepupTuple: TVoictentConfiguration['emittedVoictent'] = [];

  indicesByLanbe: Map<VoictentItemLanbe2<TVoictentConfiguration>, number> =
    new Map();

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
  }: CachedOnDiskVoictentConstructorInput<TVoictentConfiguration>) {
    this.nameSpace = nameSpace;
    this.gepp = gepp;
  }

  addHubblepup(
    receivedHubblepup: TVoictentConfiguration['receivedHubblepup'],
  ): void {
    this.receivedHubblepup.thisTick = true;

    const directoryPath = posix.join(ROOT_DIRECTORY, this.nameSpace, this.gepp);
    createDirectory(directoryPath);

    const fileName = `${receivedHubblepup.zorn}.json`;

    const filePath = posix.join(directoryPath, fileName);

    let currentCachedHubblepup:
      | TVoictentConfiguration['emittedHubblepup']
      | null;
    if (fs.existsSync(filePath)) {
      const cachedText = fs.readFileSync(filePath, 'utf8');
      currentCachedHubblepup = jsonUtils.parse(
        cachedText,
      ) as TVoictentConfiguration['emittedHubblepup'];
    } else {
      currentCachedHubblepup = null;
    }

    let emittedHubblepup: TVoictentConfiguration['emittedHubblepup'];
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
  ): VoictentItemLanbe2<TVoictentConfiguration> {
    const lanbe: VoictentItemLanbe2<TVoictentConfiguration> = {
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
    lanbe: VoictentItemLanbe2<TVoictentConfiguration>,
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

  private hasNext(lanbe: VoictentItemLanbe2<TVoictentConfiguration>): boolean {
    const currentIndex = this.getLanbeIndex(lanbe);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(lanbe: VoictentItemLanbe2<TVoictentConfiguration>): void {
    if (this.hasNext(lanbe)) {
      const currentIndex = this.getLanbeIndex(lanbe);
      this.indicesByLanbe.set(lanbe, currentIndex + 1);
    }
  }

  private dereference(
    lanbe: VoictentItemLanbe2<TVoictentConfiguration>,
  ): TVoictentConfiguration['indexedEmittedHubblepup'] {
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
