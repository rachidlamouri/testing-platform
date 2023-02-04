import { Lanbe } from './lanbe';
import { NullStraline, NULL_STRALINE } from './straline';

/**
 * A stream-like data structure for managing pointers to Stralines.
 * It encapsulates pointer indices that can range from -1 to the length of the Straline "stream" (inclusive).
 * A pointer that is out of bounds of the "stream" will dereference to the NULL_STRALINE.
 * It is primarily used by the engine to connect Quirms to Tropoignants, but it is decoupled from those specific data types.
 */
export class Voictent<TStraline> {
  stralineArray: TStraline[] = [];

  indicesByPointer: Record<symbol, number> = {};

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.size;
  }

  addStraline(straline: TStraline): void {
    this.stralineArray.push(straline);
  }

  addPointer(debugText: string): Lanbe<TStraline> {
    const pointer = Symbol(debugText);

    this.indicesByPointer[pointer] = Voictent.minimumInclusiveIndex;

    const advancePointer = (): void => {
      this.advancePointer(pointer);
    };

    const dereferencePointer = (): TStraline | NullStraline => {
      return this.dereferencePointer(pointer);
    };

    return {
      pointer,
      advance: advancePointer,
      dereference: dereferencePointer,
    };
  }

  dereferencePointer(pointer: symbol): TStraline | NullStraline {
    if (!(pointer in this.indicesByPointer)) {
      throw Error(`Pointer "${pointer.toString()}" does not exist`);
    }

    const index = this.indicesByPointer[pointer];
    if (
      index === Voictent.minimumInclusiveIndex ||
      index === this.maximumInclusiveIndex
    ) {
      return NULL_STRALINE;
    }

    const datum = this.stralineArray[index];

    return datum;
  }

  advancePointer(pointer: symbol): void {
    if (!(pointer in this.indicesByPointer)) {
      throw Error(`Pointer "${pointer.toString()}" does not exist`);
    }

    const currentIndex = this.indicesByPointer[pointer];

    if (currentIndex < this.size) {
      this.indicesByPointer[pointer] += 1;
    }
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

  debug(): unknown {
    return {
      stralineArray: this.stralineArray,
      pointers: Object.fromEntries(
        Object.getOwnPropertySymbols(this.indicesByPointer).map((pointer) => {
          return [
            pointer,
            {
              index: this.indicesByPointer[pointer],
              straline: this.dereferencePointer(pointer),
            },
          ];
        }),
      ),
    };
  }
}
