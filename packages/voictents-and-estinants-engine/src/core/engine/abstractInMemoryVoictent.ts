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

export type ReceivedHubblepupState = {
  twoTicksAgo: boolean;
  oneTickAgo: boolean;
  thisTick: boolean | null;
};

type InMemoryVoictentConstructorInput<TVoque extends GenericInMemoryVoque> = {
  gepp: TVoque['gepp'];
  initialHubblepupTuple: TVoque['emittedVoictent'];
};

export abstract class AbstractInMemoryVoictent<
  TRestrictingVoque extends GenericInMemoryVoque,
  TVoque extends TRestrictingVoque,
> implements Voictent2<TRestrictingVoque, TVoque>
{
  public readonly gepp: TVoque['gepp'];

  private initialHubblepupTuple: TVoque['emittedHubblepup'][];

  hubblepupTuple: TVoque['emittedVoictent'] = [];

  indicesByLanbe: Map<VoictentItemLanbe2<TRestrictingVoque, TVoque>, number> =
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
    gepp,
    initialHubblepupTuple,
  }: InMemoryVoictentConstructorInput<TVoque>) {
    this.gepp = gepp;
    this.initialHubblepupTuple = initialHubblepupTuple;
  }

  initialize(): void {
    this.initialHubblepupTuple.forEach((hubblepup) => {
      this.addHubblepup(hubblepup);
    });
  }

  addHubblepup(hubblepup: TVoque['receivedHubblepup']): void {
    this.receivedHubblepup.thisTick = true;

    this.hubblepupTuple.push(hubblepup);
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
    return this.hubblepupTuple.length;
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
  protected dereference(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lanbe: VoictentItemLanbe2<TRestrictingVoque, TVoque>,
  ): TVoque['indexedEmittedHubblepup'] {
    throw Error('Not implemented');
  }
}
