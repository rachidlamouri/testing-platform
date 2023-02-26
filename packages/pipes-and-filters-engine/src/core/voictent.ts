import { Lanbe } from './lanbe';
import { Hubblepup } from './hubblepup';

class MissingLanbeError extends Error {
  constructor(lanbe: Lanbe) {
    super(`Lanbe "${lanbe.debugName}" does not exist`);
  }
}

/**
 * A data structure for collecting Hubblepups in order and managing Lanbes.
 * It encapsulates pointer indices that can range from -1 to the length of the Hubblepup collection minus 1 (inclusive).
 * A pointer that is out of bounds of the collection will dereference to null.
 * It is used by the Engine to connect Hubblepups to Estinants.
 */
export class Voictent {
  hubblepupTuple: Hubblepup[] = [];

  indicesByLanbe: Map<Lanbe, number> = new Map();

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size - 1;
  }

  addHubblepup(hubblepup: Hubblepup): void {
    this.hubblepupTuple.push(hubblepup);
  }

  createLanbe(debugName: string): Lanbe {
    const lanbe: Lanbe = {
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

    this.indicesByLanbe.set(lanbe, Voictent.minimumInclusiveIndex);
    return lanbe;
  }

  private getLanbeIndex(lanbe: Lanbe): number {
    const index = this.indicesByLanbe.get(lanbe);

    if (index === undefined) {
      throw new MissingLanbeError(lanbe);
    }

    return index;
  }

  get size(): number {
    return this.hubblepupTuple.length;
  }

  private hasNext(lanbe: Lanbe): boolean {
    const currentIndex = this.getLanbeIndex(lanbe);
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  private advance(lanbe: Lanbe): void {
    if (this.hasNext(lanbe)) {
      const currentIndex = this.getLanbeIndex(lanbe);
      this.indicesByLanbe.set(lanbe, currentIndex + 1);
    }
  }

  private dereference(lanbe: Lanbe): Hubblepup | null {
    const currentIndex = this.getLanbeIndex(lanbe);

    if (currentIndex === Voictent.minimumInclusiveIndex) {
      return null;
    }

    const hubblepup = this.hubblepupTuple[currentIndex];
    return hubblepup;
  }
}
