import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * Used for testing serialization. It contains a datum of any type, and a
 * readable identifier for the particular datum, which in itself is a test case
 */
type DatumTestCaseInput = {
  zorn: string;
  grition: unknown;
};

export const DATUM_TEST_CASE_INPUT_GEPP = 'datum-test-case-input';

type DatumTestCaseInputGepp = typeof DATUM_TEST_CASE_INPUT_GEPP;

export type DatumTestCaseInputVoque =
  InMemoryIdentifiableItem2ListStreamMetatype<
    DatumTestCaseInputGepp,
    DatumTestCaseInput
  >;

class CustomObject {
  constructor(public datumList: unknown[]) {}
}

const jsonTestCaseList: DatumTestCaseInput[] = [
  {
    zorn: '0/json/0/primitive/0/string',
    grition: 'foo',
  },
  {
    zorn: '0/json/0/primitive/1/number',
    grition: 123,
  },
  {
    zorn: '0/json/0/primitive/2/boolean/0/true',
    grition: true,
  },
  {
    zorn: '0/json/0/primitive/2/boolean/1/false',
    grition: false,
  },
  {
    zorn: '0/json/0/primitive/3/null',
    grition: null,
  },
];

const jsonTestCaseListGritionList = jsonTestCaseList.map(
  (odeshin) => odeshin.grition,
);

const jsonPrimitiveCollectionTestCaseList: DatumTestCaseInput[] = [
  {
    zorn: '0/json/1/primitive-collection/0/array',
    grition: jsonTestCaseListGritionList,
  },
  {
    zorn: '0/json/1/primitive-collection/1/object',
    grition: Object.fromEntries(
      jsonTestCaseList.map(({ zorn, grition }) => [zorn, grition]),
    ),
  },
];

const jsonPrimitiveCollectionTestCaseListGritionList =
  jsonPrimitiveCollectionTestCaseList.map((odeshin) => odeshin.grition);

const jsonCollectionCollectionTestCaseList: DatumTestCaseInput[] = [
  {
    zorn: '0/json/2/collection-collection/0/array',
    grition: jsonPrimitiveCollectionTestCaseListGritionList,
  },
  {
    zorn: '0/json/2/collection-collection/1/object',
    grition: Object.fromEntries(
      jsonPrimitiveCollectionTestCaseListGritionList.map((datum, index) => [
        `key-${index}`,
        datum,
      ]),
    ),
  },
];

const primitiveTestCaseList: DatumTestCaseInput[] = [
  {
    zorn: '1/type-script/0/primitive/0/empty/0/null',
    grition: null,
  },
  {
    zorn: '1/type-script/0/primitive/0/empty/1/undefined',
    grition: undefined,
  },
  {
    zorn: '1/type-script/0/primitive/1/string/0/single-line',
    grition: 'this is a single line string',
  },
  {
    zorn: '1/type-script/0/primitive/1/string/1/multiline',
    grition: `this
  is
a multiline
  string`,
  },
  {
    zorn: '1/type-script/0/primitive/2/number/3/bigint',
    grition: 99999999999999999999999999n,
  },
  {
    zorn: '1/type-script/0/primitive/2/number/1/float',
    grition: 12.34,
  },
  {
    zorn: '1/type-script/0/primitive/2/number/0/integer',
    grition: 123,
  },
  {
    zorn: '1/type-script/0/primitive/2/number/2/leading-decimal',
    // eslint-disable-next-line prettier/prettier
    grition: .123,
  },
  {
    zorn: '1/type-script/0/primitive/3/boolean/0/true',
    grition: true,
  },
  {
    zorn: '1/type-script/0/primitive/3/boolean/1/false',
    grition: false,
  },
  {
    zorn: '1/type-script/0/primitive/4/symbol/0/without-description',
    // eslint-disable-next-line symbol-description
    grition: Symbol(),
  },
  {
    zorn: '1/type-script/0/primitive/4/symbol/1/with-description',
    // eslint-disable-next-line symbol-description
    grition: Symbol('this is a symbol description'),
  },
];

const primitiveTestCaseListGritionList = primitiveTestCaseList.map(
  ({ grition }) => grition,
);

const primitiveCollectionTestCaseList: DatumTestCaseInput[] = [
  {
    zorn: '1/type-script/1/primitive-collection/0/list',
    grition: primitiveTestCaseListGritionList,
  },
  {
    zorn: '1/type-script/1/primitive-collection/1/set',
    grition: new Set(primitiveTestCaseListGritionList),
  },
  {
    zorn: '1/type-script/1/primitive-collection/2/object/0/with-string-keys',
    grition: Object.fromEntries(
      primitiveTestCaseListGritionList.map<[string, unknown]>(
        (grition, index) => [`key-${index}`, grition],
      ),
    ),
  },
  {
    zorn: '1/type-script/1/primitive-collection/2/object/1/with-symbol-keys',
    grition: Object.fromEntries(
      primitiveTestCaseListGritionList.map<[symbol, unknown]>(
        (grition, index) => [Symbol(`key-${index}`), grition],
      ),
    ),
  },
  {
    zorn: '1/type-script/1/primitive-collection/2/object/2/custom',
    grition: new CustomObject(primitiveTestCaseListGritionList),
  },
  {
    zorn: '1/type-script/1/primitive-collection/3/map',
    grition: new Map(
      primitiveTestCaseList.map(({ grition }) => [grition, grition]),
    ),
  },
];

const primitiveCollectionTestCaseListGritionList =
  primitiveCollectionTestCaseList.map(({ grition }) => grition);

const collectionCollectionTestCaseList: DatumTestCaseInput[] = [
  {
    zorn: '1/type-script/2/collection-collection/0/list',
    grition: primitiveCollectionTestCaseListGritionList,
  },
  {
    zorn: '1/type-script/2/collection-collection/1/set',
    grition: new Set(primitiveCollectionTestCaseListGritionList),
  },
  {
    zorn: '1/type-script/2/collection-collection/2/object/0/with-string-keys',
    grition: Object.fromEntries(
      primitiveCollectionTestCaseListGritionList.map<[string, unknown]>(
        (grition, index) => [`key-${index}`, grition],
      ),
    ),
  },
  {
    zorn: '1/type-script/2/collection-collection/2/object/1/with-symbol-keys',
    grition: Object.fromEntries(
      primitiveCollectionTestCaseListGritionList.map<[symbol, unknown]>(
        (grition, index) => [Symbol(`key-${index}`), grition],
      ),
    ),
  },
  {
    zorn: '1/type-script/2/collection-collection/2/object/2/custom',
    grition: new CustomObject(primitiveCollectionTestCaseListGritionList),
  },
  {
    zorn: '1/type-script/2/collection-collection/3/map',
    grition: new Map(
      primitiveCollectionTestCaseListGritionList.map((grition) => [
        grition,
        grition,
      ]),
    ),
  },
];

const circularObject: Record<string, unknown> = { test: 1 };
circularObject.self = circularObject;
const circularArray: unknown[] = [1, 2, 3];
circularArray.push(circularArray);
const circularSet = new Set<unknown>([1, 2, 3]);
circularSet.add(circularSet);
const circularMap = new Map<unknown, unknown>([['test', 1]]);
circularMap.set(circularMap, circularMap);

const circularReferenceTestCaseList: DatumTestCaseInput[] = [
  {
    zorn: '1/type-script/3/circular-reference/0/object',
    grition: circularObject,
  },
  {
    zorn: '1/type-script/3/circular-reference/1/array',
    grition: circularArray,
  },
  {
    zorn: '1/type-script/3/circular-reference/2/set',
    grition: circularSet,
  },
  {
    zorn: '1/type-script/3/circular-reference/3/map',
    grition: circularMap,
  },
];

export const DATUM_TEST_CASE_INPUT_ODESHIN_LIST: DatumTestCaseInput[] = [
  ...jsonTestCaseList,
  ...jsonPrimitiveCollectionTestCaseList,
  ...jsonCollectionCollectionTestCaseList,
  ...primitiveTestCaseList,
  ...primitiveCollectionTestCaseList,
  ...collectionCollectionTestCaseList,
  ...circularReferenceTestCaseList,
];
