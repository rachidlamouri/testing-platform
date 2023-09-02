import {
  VoictentLanbe,
  LanbeTypeName,
  VoictentItemLanbe2,
  GenericVoictentItemLanbe2,
  ReferenceTypeName,
} from '../engine-shell/voictent/lanbe';
import { Voictent2 } from './voictent2';
import { GenericInMemoryVoque } from './inMemoryVoque';

export class DereferenceError extends Error {
  constructor(lanbe: GenericVoictentItemLanbe2) {
    super(`Lanbe "${lanbe.debugName}" has nothing to dereference`);
  }
}

export class MissingLanbeError extends Error {
  constructor(lanbe: GenericVoictentItemLanbe2) {
    super(`Lanbe "${lanbe.debugName}" does not exist`);
  }
}

export type HubblepupPelueState = {
  twoTicksAgo: boolean;
  oneTickAgo: boolean;
  thisTick: boolean | null;
};

type InMemoryVoictentConstructorInput<TVoque extends GenericInMemoryVoque> = {
  gepp: TVoque['gepp'];
  initialHubblepupPelueTuple: TVoque['hubblepupPelue'][];
};

export abstract class AbstractInMemoryVoictent<
  TRestrictingVoque extends GenericInMemoryVoque,
  TVoque extends TRestrictingVoque,
> implements Voictent2<TRestrictingVoque, TVoque>
{
  public readonly gepp: TVoque['gepp'];

  private initialHubblepupPelueTuple: TVoque['hubblepupPelue'][];

  hubblepupPelieTuple: TVoque['hubblepupPelie'][] = [];

  indicesByLanbe: Map<VoictentItemLanbe2<TRestrictingVoque, TVoque>, number> =
    new Map();

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size - 1;
  }

  private hubblepupPelueState: HubblepupPelueState = {
    twoTicksAgo: false,
    oneTickAgo: false,
    thisTick: null,
  };

  constructor({
    gepp,
    initialHubblepupPelueTuple,
  }: InMemoryVoictentConstructorInput<TVoque>) {
    this.gepp = gepp;
    this.initialHubblepupPelueTuple = initialHubblepupPelueTuple;
  }

  initialize(): void {
    this.initialHubblepupPelueTuple.forEach((hubblepup) => {
      this.addHubblepup(hubblepup);
    });
  }

  get isEmpty(): boolean {
    return this.hubblepupPelieTuple.length === 0;
  }

  addHubblepup(hubblepup: TVoque['hubblepupPelue']): void {
    this.hubblepupPelueState.thisTick = true;

    this.hubblepupPelieTuple.push(hubblepup);
  }

  onTickStart(): void {
    // eslint-disable-next-line prefer-destructuring
    this.hubblepupPelueState = {
      twoTicksAgo: this.hubblepupPelueState.oneTickAgo,
      oneTickAgo: this.hubblepupPelueState.thisTick ?? false,
      thisTick: null,
    };
  }

  get didStopAccumulating(): boolean {
    return (
      this.hubblepupPelueState.twoTicksAgo &&
      !this.hubblepupPelueState.oneTickAgo
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
          this.hubblepupPelueState.twoTicksAgo ||
          this.hubblepupPelueState.oneTickAgo ||
          (this.hubblepupPelueState.thisTick ?? false)
        );
      },
      advance: () => {},
      dereference: () => {
        return {
          typeName: ReferenceTypeName.Voictent,
          value: [...this.hubblepupPelieTuple],
        };
      },
    };

    return lanbe;
  }

  createVoictentItemLanbe(
    debugName: string,
  ): VoictentItemLanbe2<TRestrictingVoque, TVoque> {
    const lanbe: VoictentItemLanbe2<TRestrictingVoque, TVoque> = {
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

    this.indicesByLanbe.set(
      lanbe,
      AbstractInMemoryVoictent.minimumInclusiveIndex,
    );
    return lanbe;
  }

  protected getLanbeIndex(
    lanbe: VoictentItemLanbe2<TRestrictingVoque, TVoque>,
  ): number {
    const index = this.indicesByLanbe.get(lanbe);

    if (index === undefined) {
      throw new MissingLanbeError(lanbe);
    }

    return index;
  }

  get size(): number {
    return this.hubblepupPelieTuple.length;
  }

  private hasNext(
    lanbe: VoictentItemLanbe2<TRestrictingVoque, TVoque>,
  ): boolean {
    const currentIndex = this.getLanbeIndex(lanbe);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(lanbe: VoictentItemLanbe2<TRestrictingVoque, TVoque>): void {
    if (this.hasNext(lanbe)) {
      const currentIndex = this.getLanbeIndex(lanbe);
      this.indicesByLanbe.set(lanbe, currentIndex + 1);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected abstract dereference(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lanbe: VoictentItemLanbe2<TRestrictingVoque, TVoque>,
  ): TVoque['indexedHubblepupPelie'];
}
