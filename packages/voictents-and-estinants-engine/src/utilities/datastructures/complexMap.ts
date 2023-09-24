import { ConditionalKeys } from 'type-fest';
import { Tuple } from '../semantic-types/tuple';

type GenericMappableDatum = Record<string, unknown>;

type MappableKeys<TKeyDatum extends GenericMappableDatum> = ConditionalKeys<
  TKeyDatum,
  string
>;

type KeyTemplate<TKeyUnion extends string> = readonly [
  TKeyUnion,
  TKeyUnion,
  ...TKeyUnion[],
];

type DatumKeyTemplate<TKeyDatum extends GenericMappableDatum> =
  MappableKeys<TKeyDatum> extends string
    ? KeyTemplate<MappableKeys<TKeyDatum>>
    : never;

class LeafMap<TValueDatum> extends Map<string, TValueDatum> {}

class NestedMap<
  TKeyDatum extends GenericMappableDatum,
  TValueDatum,
> extends Map<
  string,
  NestedMap<TKeyDatum, TValueDatum> | LeafMap<TValueDatum>
> {}

function assertIsNestedMap<TKeyDatum extends GenericMappableDatum, TValueDatum>(
  datum: NestedMap<TKeyDatum, TValueDatum> | LeafMap<TValueDatum>,
): asserts datum is NestedMap<TKeyDatum, TValueDatum> {
  if (!(datum instanceof NestedMap)) {
    throw Error('Expected datum to be an instance of NestedMap');
  }
}

function assertIsLeafMap<TKeyDatum extends GenericMappableDatum, TValueDatum>(
  datum: NestedMap<TKeyDatum, TValueDatum> | LeafMap<TValueDatum>,
): asserts datum is LeafMap<TValueDatum> {
  if (!(datum instanceof LeafMap)) {
    throw Error('Expected datum to be an instance of LeafMap');
  }
}

function assertIsString(datum: unknown): asserts datum is string {
  if (typeof datum !== 'string') {
    throw Error('Expected datum to be a string');
  }
}

type ComplexMapConstructorInput<
  TKeyDatum extends GenericMappableDatum,
  TValueDatum,
  TKeyTemplate extends DatumKeyTemplate<TKeyDatum>,
> = {
  keyTemplate: TKeyTemplate;
  initialList?: Tuple<readonly [key: TKeyDatum, value: TValueDatum]>;
};

export class ComplexMap<
  TKeyDatum extends GenericMappableDatum,
  TValueDatum,
  TKeyTemplate extends DatumKeyTemplate<TKeyDatum>,
> {
  private rootMap = new NestedMap<TKeyDatum, TValueDatum>();

  private initialKeyTuple: TKeyTemplate[number][];

  private lastKey: TKeyTemplate[number];

  private leafMapSet = new Set<LeafMap<TValueDatum>>();

  constructor({
    keyTemplate,
    initialList = [],
  }: ComplexMapConstructorInput<TKeyDatum, TValueDatum, TKeyTemplate>) {
    const lastIndex = keyTemplate.length - 1;
    this.initialKeyTuple = keyTemplate.slice(0, lastIndex);
    this.lastKey = keyTemplate[lastIndex];

    initialList.forEach(([keyDatum, valueDatum]) => {
      this.set(keyDatum, valueDatum);
    });
  }

  set(keyDatum: TKeyDatum, valueDatum: TValueDatum): void {
    let currentMap: NestedMap<TKeyDatum, TValueDatum> | LeafMap<TValueDatum> =
      this.rootMap;
    this.initialKeyTuple.forEach((datumKey, index, list) => {
      const isLastInitialKey = index === list.length - 1;

      const nextKey = keyDatum[datumKey];
      assertIsString(nextKey);

      assertIsNestedMap<TKeyDatum, TValueDatum>(currentMap);
      const nextMap =
        currentMap.get(nextKey) ??
        (isLastInitialKey
          ? new LeafMap<TValueDatum>()
          : new NestedMap<TKeyDatum, TValueDatum>());
      currentMap.set(nextKey, nextMap);

      currentMap = nextMap;
    });

    assertIsLeafMap(currentMap);
    const lastDatumKey = keyDatum[this.lastKey];
    assertIsString(lastDatumKey);

    currentMap.set(lastDatumKey, valueDatum);
    this.leafMapSet.add(currentMap);
  }

  get(datum: TKeyDatum): TValueDatum | null {
    let currentMap:
      | NestedMap<TKeyDatum, TValueDatum>
      | LeafMap<TValueDatum>
      | null = this.rootMap;
    let templateIndex = 0;
    while (currentMap !== null && templateIndex < this.initialKeyTuple.length) {
      const datumKey = this.initialKeyTuple[templateIndex];
      const nextKey = datum[datumKey];
      assertIsString(nextKey);

      assertIsNestedMap<TKeyDatum, TValueDatum>(currentMap);
      const nextMap:
        | NestedMap<TKeyDatum, TValueDatum>
        | LeafMap<TValueDatum>
        | null = currentMap.get(nextKey) ?? null;

      currentMap = nextMap;
      templateIndex += 1;
    }

    if (currentMap === null) {
      return null;
    }

    assertIsLeafMap(currentMap);
    const lastDatumKey = datum[this.lastKey];
    assertIsString(lastDatumKey);

    const value = currentMap.get(lastDatumKey) ?? null;
    return value;
  }

  has(keyDatum: TKeyDatum): boolean {
    return this.get(keyDatum) !== null;
  }

  values(): TValueDatum[] {
    return [...this.leafMapSet].flatMap((leafMap) => {
      return [...leafMap.values()];
    });
  }
}
