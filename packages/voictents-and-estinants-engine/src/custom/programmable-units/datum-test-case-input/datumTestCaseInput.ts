import { InMemoryVoictentConfiguration } from '../../../core/engine/inMemoryVoictent';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type DatumTestCaseInput = unknown;

export type DatumTestCaseInputGrition = Grition<DatumTestCaseInput>;

export type DatumTestCaseInputOdeshin =
  OdeshinFromGrition<DatumTestCaseInputGrition>;

export const DATUM_TEST_CASE_INPUT_GEPP = 'datum-test-case-input';

export type DatumTestCaseInputGepp = typeof DATUM_TEST_CASE_INPUT_GEPP;

export type DatumTestCaseInputVoictent = Voictent<
  DatumTestCaseInputGepp,
  DatumTestCaseInputOdeshin
>;

export type DatumTestCaseInputVoictentConfiguration =
  InMemoryVoictentConfiguration<
    DatumTestCaseInputGepp,
    DatumTestCaseInputOdeshin
  >;

class CustomObject {
  constructor(public datumList: unknown[]) {}
}

const jsonTestCaseList: DatumTestCaseInputOdeshin[] = [
  {
    zorn: '-/0/json-primitive/0/string',
    grition: 'foo',
  },
  {
    zorn: '-/0/json-primitive/1/number',
    grition: 123,
  },
  {
    zorn: '-/0/json-primitive/2/boolean/0/true',
    grition: true,
  },
  {
    zorn: '-/0/json-primitive/2/boolean/1/false',
    grition: false,
  },
  {
    zorn: '-/0/json-primitive/3/null',
    grition: null,
  },
];

const jsonTestCaseListGritionList = jsonTestCaseList.map(
  (odeshin) => odeshin.grition,
);

const jsonPrimitiveCollectionTestCaseList: DatumTestCaseInputOdeshin[] = [
  {
    zorn: '-/1/json-primitive-collection/0/array',
    grition: jsonTestCaseListGritionList,
  },
  {
    zorn: '-/1/json-primitive-collection/1/object',
    grition: Object.fromEntries(
      jsonTestCaseList.map(({ zorn, grition }) => [zorn, grition]),
    ),
  },
];

const jsonPrimitiveCollectionTestCaseListGritionList =
  jsonPrimitiveCollectionTestCaseList.map((odeshin) => odeshin.grition);

const jsonCollectionCollectionTestCaseList: DatumTestCaseInputOdeshin[] = [
  {
    zorn: '-/2/json-collection-collection/0/array',
    grition: jsonPrimitiveCollectionTestCaseListGritionList,
  },
  {
    zorn: '-/2/json-collection-collection/1/object',
    grition: Object.fromEntries(
      jsonPrimitiveCollectionTestCaseListGritionList.map((datum, index) => [
        `key-${index}`,
        datum,
      ]),
    ),
  },
];

const primitiveTestCaseList: DatumTestCaseInputOdeshin[] = [
  {
    zorn: '0/primitive/0/empty/0/null',
    grition: null,
  },
  {
    zorn: '0/primitive/0/empty/1/undefined',
    grition: undefined,
  },
  {
    zorn: '0/primitive/1/string/0/single-line',
    grition: 'this is a single line string',
  },
  {
    zorn: '0/primitive/1/string/1/multiline',
    grition: `this
  is
a multiline
  string`,
  },
  {
    zorn: '0/primitive/2/number/3/bigint',
    grition: 99999999999999999999999999n,
  },
  {
    zorn: '0/primitive/2/number/1/float',
    grition: 12.34,
  },
  {
    zorn: '0/primitive/2/number/0/integer',
    grition: 123,
  },
  {
    zorn: '0/primitive/2/number/2/leading-decimal',
    // eslint-disable-next-line prettier/prettier
    grition: .123,
  },
  {
    zorn: '0/primitive/3/boolean/0/true',
    grition: true,
  },
  {
    zorn: '0/primitive/3/boolean/1/false',
    grition: false,
  },
  {
    zorn: '0/primitive/4/symbol/0/without-description',
    // eslint-disable-next-line symbol-description
    grition: Symbol(),
  },
  {
    zorn: '0/primitive/4/symbol/1/with-description',
    // eslint-disable-next-line symbol-description
    grition: Symbol('this is a symbol description'),
  },
];

const primitiveTestCaseListGritionList = primitiveTestCaseList.map(
  ({ grition }) => grition,
);

const primitiveCollectionTestCaseList: DatumTestCaseInputOdeshin[] = [
  {
    zorn: '1/primitive-collection/0/list',
    grition: primitiveTestCaseListGritionList,
  },
  {
    zorn: '1/primitive-collection/1/set',
    grition: new Set(primitiveTestCaseListGritionList),
  },
  {
    zorn: '1/primitive-collection/2/object/0/with-string-keys',
    grition: Object.fromEntries(
      primitiveTestCaseListGritionList.map<[string, unknown]>(
        (grition, index) => [`key-${index}`, grition],
      ),
    ),
  },
  {
    zorn: '1/primitive-collection/2/object/1/with-symbol-keys',
    grition: Object.fromEntries(
      primitiveTestCaseListGritionList.map<[symbol, unknown]>(
        (grition, index) => [Symbol(`key-${index}`), grition],
      ),
    ),
  },
  {
    zorn: '1/primitive-collection/2/object/2/custom',
    grition: new CustomObject(primitiveTestCaseListGritionList),
  },
  {
    zorn: '1/primitive-collection/3/map',
    grition: new Map(
      primitiveTestCaseList.map(({ grition }) => [grition, grition]),
    ),
  },
];

const primitiveCollectionTestCaseListGritionList =
  primitiveCollectionTestCaseList.map(({ grition }) => grition);

const collectionCollectionTestCaseList: DatumTestCaseInputOdeshin[] = [
  {
    zorn: '2/collection-collection/0/list',
    grition: primitiveCollectionTestCaseListGritionList,
  },
  {
    zorn: '2/collection-collection/1/set',
    grition: new Set(primitiveCollectionTestCaseListGritionList),
  },
  {
    zorn: '2/collection-collection/2/object/0/with-string-keys',
    grition: Object.fromEntries(
      primitiveCollectionTestCaseListGritionList.map<[string, unknown]>(
        (grition, index) => [`key-${index}`, grition],
      ),
    ),
  },
  {
    zorn: '2/collection-collection/2/object/1/with-symbol-keys',
    grition: Object.fromEntries(
      primitiveCollectionTestCaseListGritionList.map<[symbol, unknown]>(
        (grition, index) => [Symbol(`key-${index}`), grition],
      ),
    ),
  },
  {
    zorn: '2/collection-collection/2/object/2/custom',
    grition: new CustomObject(primitiveCollectionTestCaseListGritionList),
  },
  {
    zorn: '2/collection-collection/3/map',
    grition: new Map(
      primitiveCollectionTestCaseListGritionList.map((grition) => [
        grition,
        grition,
      ]),
    ),
  },
];

export const DATUM_TEST_CASE_INPUT_ODESHIN_LIST: DatumTestCaseInputOdeshin[] = [
  ...jsonTestCaseList,
  ...jsonPrimitiveCollectionTestCaseList,
  ...jsonCollectionCollectionTestCaseList,
  ...primitiveTestCaseList,
  ...primitiveCollectionTestCaseList,
  ...collectionCollectionTestCaseList,
];
