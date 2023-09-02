import {
  LanbeTypeName,
  ReferenceTypeName,
  HubblepupPelieLanbe,
  VoictentPelieLanbe,
} from '../engine-shell/voictent/lanbe';
import { Hubblepup } from '../engine-shell/quirm/hubblepup';
import { Gepp } from '../engine-shell/voictent/gepp';
import { GenericVoictent2 } from './voictent2';

class MissingLanbeError extends Error {
  constructor(lanbe: HubblepupPelieLanbe) {
    super(`Lanbe "${lanbe.debugName}" does not exist`);
  }
}

type HubblepupPelueState = {
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
export class Voictent implements GenericVoictent2 {
  hubblepupTuple: Hubblepup[] = [];

  indicesByLanbe: Map<HubblepupPelieLanbe, number> = new Map();

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size - 1;
  }

  private hubblepupPelue: HubblepupPelueState = {
    twoTicksAgo: false,
    oneTickAgo: false,
    thisTick: null,
  };

  constructor(public readonly gepp: Gepp) {}

  // eslint-disable-next-line class-methods-use-this
  initialize(): void {
    // no op
  }

  get isEmpty(): boolean {
    return this.hubblepupTuple.length === 0;
  }

  addHubblepup(hubblepup: Hubblepup): void {
    this.hubblepupPelue.thisTick = true;
    this.hubblepupTuple.push(hubblepup);
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

  createVoictentLanbe(debugName: string): VoictentPelieLanbe {
    const lanbe: VoictentPelieLanbe = {
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

  createVoictentItemLanbe(debugName: string): HubblepupPelieLanbe {
    const lanbe: HubblepupPelieLanbe = {
      typeName: LanbeTypeName.HubblepupPelieLanbe,
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
          typeName: ReferenceTypeName.HubblepupPelie,
          value,
        };
      },
    };

    this.indicesByLanbe.set(lanbe, Voictent.minimumInclusiveIndex);
    return lanbe;
  }

  private getLanbeIndex(lanbe: HubblepupPelieLanbe): number {
    const index = this.indicesByLanbe.get(lanbe);

    if (index === undefined) {
      throw new MissingLanbeError(lanbe);
    }

    return index;
  }

  get size(): number {
    return this.hubblepupTuple.length;
  }

  private hasNext(lanbe: HubblepupPelieLanbe): boolean {
    const currentIndex = this.getLanbeIndex(lanbe);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(lanbe: HubblepupPelieLanbe): void {
    if (this.hasNext(lanbe)) {
      const currentIndex = this.getLanbeIndex(lanbe);
      this.indicesByLanbe.set(lanbe, currentIndex + 1);
    }
  }

  private dereference(lanbe: HubblepupPelieLanbe): Hubblepup {
    const currentIndex = this.getLanbeIndex(lanbe);

    if (currentIndex === Voictent.minimumInclusiveIndex) {
      throw Error('There is nothing to dereference');
    }

    const hubblepup = this.hubblepupTuple[currentIndex];
    return hubblepup;
  }
}
