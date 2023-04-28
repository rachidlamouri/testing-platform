import { Tuple } from '../../utilities/semantic-types/tuple';
import { Hubblepup, IndexedHubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import {
  VoictentLanbe,
  LanbeTypeName,
  VoictentItemLanbe2,
  GenericVoictentItemLanbe2,
  ReferenceTypeName,
} from '../engine-shell/voictent/lanbe';
import { Voictent2 } from './voictent2';
import { IVoictentDebugger } from './voictentDebugger';

export type InMemoryVoictentConstructorInput<
  TGepp extends Gepp,
  THubblepup extends Hubblepup,
> = {
  gepp: TGepp;
  initialHubblepupTuple: Tuple<THubblepup>;
  voictentDebugger?: IVoictentDebugger<TGepp, THubblepup>;
};

class MissingLanbeError extends Error {
  constructor(lanbe: GenericVoictentItemLanbe2) {
    super(`Lanbe "${lanbe.debugName}" does not exist`);
  }
}

type ReceivedHubblepupState = {
  twoTicksAgo: boolean;
  oneTickAgo: boolean;
  thisTick: boolean | null;
};

export type InMemoryVoictentIndex = number;

export class InMemoryVoictent<TGepp extends Gepp, THubblepup extends Hubblepup>
  implements Voictent2<TGepp, THubblepup, number>
{
  public readonly gepp: TGepp;

  public readonly voictentDebugger?: IVoictentDebugger<TGepp, THubblepup>;

  hubblepupTuple: THubblepup[] = [];

  indicesByLanbe: Map<
    VoictentItemLanbe2<THubblepup, InMemoryVoictentIndex>,
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
    gepp,
    initialHubblepupTuple,
    voictentDebugger,
  }: InMemoryVoictentConstructorInput<TGepp, THubblepup>) {
    this.gepp = gepp;
    this.voictentDebugger = voictentDebugger;

    initialHubblepupTuple.forEach((hubblepup) => {
      this.addHubblepup(hubblepup);
    });
  }

  addHubblepup(hubblepup: THubblepup): void {
    this.receivedHubblepup.thisTick = true;
    this.hubblepupTuple.push(hubblepup);

    this.voictentDebugger?.onHubblepupAddedToVoictent({
      voictent: this,
      hubblepup,
    });
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
  ): VoictentItemLanbe2<THubblepup, InMemoryVoictentIndex> {
    const lanbe: VoictentItemLanbe2<THubblepup, InMemoryVoictentIndex> = {
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

    this.indicesByLanbe.set(lanbe, InMemoryVoictent.minimumInclusiveIndex);
    return lanbe;
  }

  private getLanbeIndex(
    lanbe: VoictentItemLanbe2<THubblepup, InMemoryVoictentIndex>,
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
    lanbe: VoictentItemLanbe2<THubblepup, InMemoryVoictentIndex>,
  ): boolean {
    const currentIndex = this.getLanbeIndex(lanbe);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(
    lanbe: VoictentItemLanbe2<THubblepup, InMemoryVoictentIndex>,
  ): void {
    if (this.hasNext(lanbe)) {
      const currentIndex = this.getLanbeIndex(lanbe);
      this.indicesByLanbe.set(lanbe, currentIndex + 1);
    }
  }

  private dereference(
    lanbe: VoictentItemLanbe2<THubblepup, InMemoryVoictentIndex>,
  ): IndexedHubblepup<THubblepup, InMemoryVoictentIndex> {
    const currentIndex = this.getLanbeIndex(lanbe);

    if (currentIndex === InMemoryVoictent.minimumInclusiveIndex) {
      throw Error('There is nothing to reference');
    }

    const hubblepup = this.hubblepupTuple[currentIndex];
    return {
      hubblepup,
      index: currentIndex,
    };
  }
}
