import {
  LanbeTypeName,
  ReferenceTypeName,
  VoictentItemLanbe,
  VoictentLanbe,
} from '../engine-shell/voictent/lanbe';
import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import { GenericVoictent } from './voictent2';

class MissingLanbeError extends Error {
  constructor(lanbe: VoictentItemLanbe) {
    super(`Lanbe "${lanbe.debugName}" does not exist`);
  }
}

type ReceivedHubblepupState = {
  twoTicksAgo: boolean;
  oneTickAgo: boolean;
  thisTick: boolean | null;
};

/**
 * A data structure for collecting Hubblepups in order and managing Lanbes.
 * It encapsulates pointer indices that can range from -1 to the length of the Hubblepup collection minus 1 (inclusive).
 * A pointer that is out of bounds of the collection will dereference to null.
 * It is used by the Engine to connect Hubblepups to Estinants.
 */
export class Voictent implements GenericVoictent {
  hubblepupTuple: Hubblepup[] = [];

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

  constructor(public readonly gepp: Gepp) {}

  addHubblepup(hubblepup: Hubblepup): void {
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
        const value = this.dereference(lanbe);

        return {
          typeName: ReferenceTypeName.VoictentItem,
          value,
        };
      },
    };

    this.indicesByLanbe.set(lanbe, Voictent.minimumInclusiveIndex);
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

  private dereference(lanbe: VoictentItemLanbe): Hubblepup {
    const currentIndex = this.getLanbeIndex(lanbe);

    if (currentIndex === Voictent.minimumInclusiveIndex) {
      throw Error('There is nothing to dereference');
    }

    const hubblepup = this.hubblepupTuple[currentIndex];
    return hubblepup;
  }
}
