class DereferenceError extends Error {
  constructor(pointerName: string) {
    super(`Pointer "${pointerName}" has nothing to dereference`);
  }
}

class DuplicatePointerError extends Error {
  constructor(pointerName: string) {
    super(`Pointer "${pointerName}" already exists`);
  }
}

type DatumStateEgg = {
  twoTicksAgo: boolean;
  oneTickAgo: boolean;
  thisTick: boolean | null;
};

type InMemoryCachePointerConstructorInput<TDatum> = {
  name: string;
  datumTupleReference: TDatum[];
};

class InMemoryCachePointer<TDatum> {
  private name: string;

  private index = -1;

  private datumTupleReference: TDatum[];

  get tupleSize(): number {
    return this.datumTupleReference.length;
  }

  static minimumInclusiveIndex = -1;

  private get maximumInclusiveIndex(): number {
    return this.tupleSize - 1;
  }

  constructor({
    name,
    datumTupleReference,
  }: InMemoryCachePointerConstructorInput<TDatum>) {
    this.name = name;
    this.datumTupleReference = datumTupleReference;
  }

  hasNext(): boolean {
    return this.tupleSize > 0 && this.index < this.maximumInclusiveIndex;
  }

  advance(): void {
    if (this.hasNext()) {
      this.index += 1;
    }
  }

  dereference(): TDatum {
    if (this.index === InMemoryCachePointer.minimumInclusiveIndex) {
      throw new DereferenceError(this.name);
    }

    return this.datumTupleReference[this.index];
  }
}

/**
 * Encapsulates storing data in memory in a list, and producing pointers that
 * can traverse the list independently
 *
 * @todo should pointers be renamed to iterators? :thinking-monocle:
 */
export class InMemoryCache<TDatum> {
  protected datumTuple: TDatum[] = [];

  private pointerByName = new Map<string, InMemoryCachePointer<TDatum>>();
  // private datumIndexByPointerName: Map<string, number> = new Map();

  private datumStateEgg: DatumStateEgg = {
    twoTicksAgo: false,
    oneTickAgo: false,
    thisTick: null,
  };

  get isEmpty(): boolean {
    return this.datumTuple.length === 0;
  }

  onTickStart(): void {
    // eslint-disable-next-line prefer-destructuring
    this.datumStateEgg = {
      twoTicksAgo: this.datumStateEgg.oneTickAgo,
      oneTickAgo: this.datumStateEgg.thisTick ?? false,
      thisTick: null,
    };
  }

  addDatum(datum: TDatum): void {
    this.datumStateEgg.thisTick = true;

    this.datumTuple.push(datum);
  }

  createPointer(pointerName: string): InMemoryCachePointer<TDatum> {
    if (this.pointerByName.has(pointerName)) {
      throw new DuplicatePointerError(pointerName);
    }

    const pointer = new InMemoryCachePointer({
      name: pointerName,
      datumTupleReference: this.datumTuple,
    });

    return pointer;
  }

  get didStopAccumulating(): boolean {
    return this.datumStateEgg.twoTicksAgo && !this.datumStateEgg.oneTickAgo;
  }

  get isAccumulating(): boolean {
    return (
      this.datumStateEgg.twoTicksAgo ||
      this.datumStateEgg.oneTickAgo ||
      (this.datumStateEgg.thisTick ?? false)
    );
  }

  getDatumTuple(): TDatum[] {
    return this.datumTuple;
  }
}
