import { Tuple } from '../../utilities/semantic-types/tuple';
import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import {
  VoictentItemLanbe,
  VoictentLanbe,
  LanbeTypeName,
  Lanbe,
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
  constructor(lanbe: VoictentItemLanbe) {
    super(`Lanbe "${lanbe.debugName}" does not exist`);
  }
}

class NullReferenceError extends Error {
  constructor(voictent: Voictent2<Gepp, Hubblepup>, lanbe: Lanbe) {
    super(
      `Lanbe "${lanbe.debugName}" attempted to reference empty voictent ${voictent.gepp}`,
    );
  }
}

type ReceivedHubblepupState = {
  twoTicksAgo: boolean;
  oneTickAgo: boolean;
  thisTick: boolean | null;
};

export class InMemoryVoictent<TGepp extends Gepp, THubblepup extends Hubblepup>
  implements Voictent2<TGepp, THubblepup>
{
  public readonly gepp: TGepp;

  public readonly voictentDebugger?: IVoictentDebugger<TGepp, THubblepup>;

  hubblepupTuple: THubblepup[] = [];

  indicesByLanbe: Map<VoictentItemLanbe, number> = new Map();

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
        return [...this.hubblepupTuple];
      },
    };

    return lanbe;
  }

  createVoictentItemLanbe(debugName: string): VoictentItemLanbe {
    const lanbe: VoictentItemLanbe = {
      typeName: LanbeTypeName.VoictentItemLanbe,
      debugName,
      hasNext: () => {
        return this.hasNext(lanbe);
      },
      advance: () => {
        this.advance(lanbe);
      },
      dereference: () => {
        return this.dereference(lanbe);
      },
    };

    this.indicesByLanbe.set(lanbe, InMemoryVoictent.minimumInclusiveIndex);
    return lanbe;
  }

  private getLanbeIndex(lanbe: VoictentItemLanbe): number {
    const index = this.indicesByLanbe.get(lanbe);

    if (index === undefined) {
      throw new MissingLanbeError(lanbe);
    }

    return index;
  }

  get size(): number {
    return this.hubblepupTuple.length;
  }

  private hasNext(lanbe: VoictentItemLanbe): boolean {
    const currentIndex = this.getLanbeIndex(lanbe);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(lanbe: VoictentItemLanbe): void {
    if (this.hasNext(lanbe)) {
      const currentIndex = this.getLanbeIndex(lanbe);
      this.indicesByLanbe.set(lanbe, currentIndex + 1);
    }
  }

  private dereference(lanbe: VoictentItemLanbe): Hubblepup | null {
    const currentIndex = this.getLanbeIndex(lanbe);

    if (currentIndex === InMemoryVoictent.minimumInclusiveIndex) {
      throw new NullReferenceError(this, lanbe);
    }

    const hubblepup = this.hubblepupTuple[currentIndex];
    return hubblepup;
  }
}
