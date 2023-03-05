import { Voictent } from '../../type-script-adapter/voictent';
import { Grition } from '../adapter/grition';
import { OdeshinFromGrition } from '../adapter/odeshin';

type TestCase<TDescription extends string = string, TInput = unknown> = {
  description: TDescription;
  input: TInput;
};

export type SerializeTestCaseInput = unknown;

export type SerializeTestCaseInputGrition = Grition<SerializeTestCaseInput>;

export type SerializeTestInputCaseHubblepup =
  OdeshinFromGrition<SerializeTestCaseInputGrition>;

export const SERIALIZE_TEST_CASE_INPUT_GEPP = 'serialize-test-case-input-gepp';

export type SerializeTestInputCaseGepp = typeof SERIALIZE_TEST_CASE_INPUT_GEPP;

export type SerializeTestCaseInputVoictent = Voictent<
  SerializeTestInputCaseGepp,
  SerializeTestInputCaseHubblepup
>;

const primitiveOptionTuple = [
  ['00:primitive:string:single-line', 'abc'],
  ['01:primitive:string:multiline', 'abc\ndef'],
  ['02:primitive:number', 123.45678],
  ['03:primitive:bigint', 9999999999999999999999999999999n],
  ['04:primitive:boolean:true', true],
  ['05:primitive:boolean:false', false],
  ['06:primitive:symbol:without-description', Symbol('')],
  ['07:primitive:symbol:with-description', Symbol('custom-description')],
  ['08:primitive:undefined', undefined],
  ['09:primitive:null', null],
] as const;

const primitiveTestCaseTuple = primitiveOptionTuple.map<TestCase>(
  ([description, value]) => ({ description, input: value }),
);

const complexTestCaseTuple = [
  {
    description: '10:collection-of-primitives:list',
    input: Object.values(
      Object.fromEntries(primitiveOptionTuple) as Record<string, unknown>,
    ),
  },
  {
    description: '11:collection-of-primitives:object',
    input: Object.fromEntries(primitiveOptionTuple) as object,
  },
  {
    description: '12:collection-of-lists:list',
    input: Object.values(
      Object.fromEntries(primitiveOptionTuple) as Record<string, unknown>,
    ).map((value) => [value]),
  },
  {
    description: '13:collection-of-lists:object',
    input: Object.fromEntries(
      primitiveOptionTuple.map(([key, value]) => [key, [value]]),
    ) as object,
  },
  {
    description: '14:collection-of-objects:list',
    input: primitiveOptionTuple.map(([key, value]) => ({ [key]: value })),
  },
  {
    description: '15:collection-of-objects:object',
    input: Object.fromEntries(
      primitiveOptionTuple.map(([key, value]) => [
        key,
        { key1: value, key2: value },
      ]),
    ) as object,
  },
] satisfies TestCase[];

const circularReferenceTestCases = ((): TestCase[] => {
  const list: unknown[] = [];
  list[0] = list;

  const object: Record<string, unknown> = {};
  object.someKey = object;

  return [
    {
      description: '16:circular-reference:list',
      input: list,
    },
    {
      description: '17:circular-reference:object',
      input: object,
    },
  ];
})();

const collectionOfCollectionsTestCase: TestCase = {
  description: '18:collection-keyed-by-data',
  input: new Map(
    [
      ...primitiveTestCaseTuple,
      ...complexTestCaseTuple,
      ...circularReferenceTestCases,
    ].map((testCase): [unknown, unknown] => [testCase.input, testCase.input]),
  ),
};

export const SERIALIZE_TEST_CASE_INPUT_TUPLE = [
  ...primitiveTestCaseTuple,
  ...complexTestCaseTuple,
  ...circularReferenceTestCases,
  collectionOfCollectionsTestCase,
].map<SerializeTestInputCaseHubblepup>((testCase) => ({
  identifier: testCase.description,
  grition: testCase.input,
}));
