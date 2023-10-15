import { InMemoryIdentifiableItem2ListStreamMetatype } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

/**
 * Used for testing serialization. It contains a datum of any type, and a
 * readable identifier for the particular datum, which in itself is a test case
 */
type DatumTestCaseInput = {
  id: string;
  subitem: unknown;
};

export const DATUM_TEST_CASE_INPUT_COLLECTION_ID = 'datum-test-case-input';

type DatumTestCaseInputCollectionId =
  typeof DATUM_TEST_CASE_INPUT_COLLECTION_ID;

export type DatumTestCaseInputStreamMetatype =
  InMemoryIdentifiableItem2ListStreamMetatype<
    DatumTestCaseInputCollectionId,
    DatumTestCaseInput
  >;

class CustomObject {
  constructor(public datumList: unknown[]) {}
}

const jsonTestCaseList: DatumTestCaseInput[] = [
  {
    id: '0/json/0/primitive/0/string',
    subitem: 'foo',
  },
  {
    id: '0/json/0/primitive/1/number',
    subitem: 123,
  },
  {
    id: '0/json/0/primitive/2/boolean/0/true',
    subitem: true,
  },
  {
    id: '0/json/0/primitive/2/boolean/1/false',
    subitem: false,
  },
  {
    id: '0/json/0/primitive/3/null',
    subitem: null,
  },
];

const jsonTestCaseListSubitemList = jsonTestCaseList.map(
  (identifiableItem) => identifiableItem.subitem,
);

const jsonPrimitiveCollectionTestCaseList: DatumTestCaseInput[] = [
  {
    id: '0/json/1/primitive-collection/0/array',
    subitem: jsonTestCaseListSubitemList,
  },
  {
    id: '0/json/1/primitive-collection/1/object',
    subitem: Object.fromEntries(
      jsonTestCaseList.map(({ id, subitem }) => [id, subitem]),
    ),
  },
];

const jsonPrimitiveCollectionTestCaseListSubitemList =
  jsonPrimitiveCollectionTestCaseList.map(
    (identifiableItem) => identifiableItem.subitem,
  );

const jsonCollectionCollectionTestCaseList: DatumTestCaseInput[] = [
  {
    id: '0/json/2/collection-collection/0/array',
    subitem: jsonPrimitiveCollectionTestCaseListSubitemList,
  },
  {
    id: '0/json/2/collection-collection/1/object',
    subitem: Object.fromEntries(
      jsonPrimitiveCollectionTestCaseListSubitemList.map((datum, index) => [
        `key-${index}`,
        datum,
      ]),
    ),
  },
];

const primitiveTestCaseList: DatumTestCaseInput[] = [
  {
    id: '1/type-script/0/primitive/0/empty/0/null',
    subitem: null,
  },
  {
    id: '1/type-script/0/primitive/0/empty/1/undefined',
    subitem: undefined,
  },
  {
    id: '1/type-script/0/primitive/1/string/0/single-line',
    subitem: 'this is a single line string',
  },
  {
    id: '1/type-script/0/primitive/1/string/1/multiline',
    subitem: `this
  is
a multiline
  string`,
  },
  {
    id: '1/type-script/0/primitive/2/number/3/bigint',
    subitem: 99999999999999999999999999n,
  },
  {
    id: '1/type-script/0/primitive/2/number/1/float',
    subitem: 12.34,
  },
  {
    id: '1/type-script/0/primitive/2/number/0/integer',
    subitem: 123,
  },
  {
    id: '1/type-script/0/primitive/2/number/2/leading-decimal',
    // eslint-disable-next-line prettier/prettier
    subitem: .123,
  },
  {
    id: '1/type-script/0/primitive/3/boolean/0/true',
    subitem: true,
  },
  {
    id: '1/type-script/0/primitive/3/boolean/1/false',
    subitem: false,
  },
  {
    id: '1/type-script/0/primitive/4/symbol/0/without-description',
    // eslint-disable-next-line symbol-description
    subitem: Symbol(),
  },
  {
    id: '1/type-script/0/primitive/4/symbol/1/with-description',
    // eslint-disable-next-line symbol-description
    subitem: Symbol('this is a symbol description'),
  },
];

const primitiveTestCaseListSubitemList = primitiveTestCaseList.map(
  ({ subitem }) => subitem,
);

const primitiveCollectionTestCaseList: DatumTestCaseInput[] = [
  {
    id: '1/type-script/1/primitive-collection/0/list',
    subitem: primitiveTestCaseListSubitemList,
  },
  {
    id: '1/type-script/1/primitive-collection/1/set',
    subitem: new Set(primitiveTestCaseListSubitemList),
  },
  {
    id: '1/type-script/1/primitive-collection/2/object/0/with-string-keys',
    subitem: Object.fromEntries(
      primitiveTestCaseListSubitemList.map<[string, unknown]>(
        (subitem, index) => [`key-${index}`, subitem],
      ),
    ),
  },
  {
    id: '1/type-script/1/primitive-collection/2/object/1/with-symbol-keys',
    subitem: Object.fromEntries(
      primitiveTestCaseListSubitemList.map<[symbol, unknown]>(
        (subitem, index) => [Symbol(`key-${index}`), subitem],
      ),
    ),
  },
  {
    id: '1/type-script/1/primitive-collection/2/object/2/custom',
    subitem: new CustomObject(primitiveTestCaseListSubitemList),
  },
  {
    id: '1/type-script/1/primitive-collection/3/map',
    subitem: new Map(
      primitiveTestCaseList.map(({ subitem }) => [subitem, subitem]),
    ),
  },
];

const primitiveCollectionTestCaseListSubitemList =
  primitiveCollectionTestCaseList.map(({ subitem }) => subitem);

const collectionCollectionTestCaseList: DatumTestCaseInput[] = [
  {
    id: '1/type-script/2/collection-collection/0/list',
    subitem: primitiveCollectionTestCaseListSubitemList,
  },
  {
    id: '1/type-script/2/collection-collection/1/set',
    subitem: new Set(primitiveCollectionTestCaseListSubitemList),
  },
  {
    id: '1/type-script/2/collection-collection/2/object/0/with-string-keys',
    subitem: Object.fromEntries(
      primitiveCollectionTestCaseListSubitemList.map<[string, unknown]>(
        (subitem, index) => [`key-${index}`, subitem],
      ),
    ),
  },
  {
    id: '1/type-script/2/collection-collection/2/object/1/with-symbol-keys',
    subitem: Object.fromEntries(
      primitiveCollectionTestCaseListSubitemList.map<[symbol, unknown]>(
        (subitem, index) => [Symbol(`key-${index}`), subitem],
      ),
    ),
  },
  {
    id: '1/type-script/2/collection-collection/2/object/2/custom',
    subitem: new CustomObject(primitiveCollectionTestCaseListSubitemList),
  },
  {
    id: '1/type-script/2/collection-collection/3/map',
    subitem: new Map(
      primitiveCollectionTestCaseListSubitemList.map((subitem) => [
        subitem,
        subitem,
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
    id: '1/type-script/3/circular-reference/0/object',
    subitem: circularObject,
  },
  {
    id: '1/type-script/3/circular-reference/1/array',
    subitem: circularArray,
  },
  {
    id: '1/type-script/3/circular-reference/2/set',
    subitem: circularSet,
  },
  {
    id: '1/type-script/3/circular-reference/3/map',
    subitem: circularMap,
  },
];

export const DATUM_TEST_CASE_INPUT_IDENTIFIABLE_ITEM_LIST: DatumTestCaseInput[] =
  [
    ...jsonTestCaseList,
    ...jsonPrimitiveCollectionTestCaseList,
    ...jsonCollectionCollectionTestCaseList,
    ...primitiveTestCaseList,
    ...primitiveCollectionTestCaseList,
    ...collectionCollectionTestCaseList,
    ...circularReferenceTestCaseList,
  ];
