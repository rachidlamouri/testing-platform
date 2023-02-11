import { Lanbe } from './lanbe';
import { NullStraline, NULL_STRALINE } from './straline';

/**
 * A data structure for collecting Stralines in order and managing pointers to stralines.
 * It encapsulates pointer indices that can range from -1 to the length of the Straline collection minus 1 (inclusive).
 * A pointer that is out of bounds of the collection will dereference to the NULL_STRALINE.
 * It is primarily used by the Engine to connect Quirms to Estinants, but it is decoupled from those specific data types.
 */
export class Voictent<TStraline> {
  stralineArray: TStraline[] = [];

  indicesByPointer: Record<symbol, number> = {};

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size - 1;
  }

  addStraline(straline: TStraline): void {
    this.stralineArray.push(straline);
  }

  createPointer(debugText: string): Lanbe<TStraline> {
    const pointer = Symbol(debugText);

    this.indicesByPointer[pointer] = Voictent.minimumInclusiveIndex;

    const canAdvancePointer = (): boolean => {
      return this.canAdvance(pointer);
    };

    const advancePointer = (): void => {
      this.advancePointer(pointer);
    };

    const dereferencePointer = (): TStraline | NullStraline => {
      return this.dereferencePointer(pointer);
    };

    return {
      pointer,
      canAdvance: canAdvancePointer,
      advance: advancePointer,
      dereference: dereferencePointer,
    };
  }

  dereferencePointer(pointer: symbol): TStraline | NullStraline {
    if (!(pointer in this.indicesByPointer)) {
      throw Error(`Pointer "${pointer.toString()}" does not exist`);
    }

    const index = this.indicesByPointer[pointer];
    if (index === Voictent.minimumInclusiveIndex) {
      return NULL_STRALINE;
    }

    const datum = this.stralineArray[index];

    return datum;
  }

  advancePointer(pointer: symbol): void {
    if (!(pointer in this.indicesByPointer)) {
      throw Error(`Pointer "${pointer.toString()}" does not exist`);
    }

    if (this.canAdvance(pointer)) {
      this.indicesByPointer[pointer] += 1;
    }
  }

  canAdvance(pointer: symbol): boolean {
    const currentIndex = this.indicesByPointer[pointer];
    return this.size > 0 && currentIndex < this.maximumInclusiveIndex;
  }

  get size(): number {
    return this.stralineArray.length;
  }

  get head(): TStraline | NullStraline {
    if (this.size === 0) {
      return NULL_STRALINE;
    }

    return this.stralineArray[0];
  }

  get tail(): TStraline | NullStraline {
    if (this.size === 0) {
      return NULL_STRALINE;
    }

    return this.stralineArray[this.size - 1];
  }
}
