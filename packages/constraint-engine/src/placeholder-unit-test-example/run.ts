/**
 * @file This file serves as a temporary stand-in for proper unit tests
 * We're trying to get the constraint-engine working so we can use it to drive linting test coverage.
 */

import { buildRuleConfiguration } from '../configurationHelpers/buildRuleConfiguration';
import { buildStaticTargetReferenceConfiguration } from '../configurationHelpers/buildStaticTargetReferenceConfiguration';
import { constraintEngine } from '../engine/constraintEngine';
import {
  DerivedReferenceBuilder,
  NormalizedDerivedReferenceBuilder,
} from '../types/builders/derivedReferenceBuilder';
import { UnknownRuleConfiguration } from '../types/ruleConfiguration';
import { TargetReference } from '../types/targetReference';
import { DerivedTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { TypedTargetFromTargetReference } from '../types/typedTargetFromTargetReference';

type A1In = TargetReference<{ typeId: 'A1'; instance: string }, ''>;

type AIn = [A1In];

type BOut = [TargetReference<{ typeId: 'B'; instance: number }, ':foo'>];

const buildReferences1: DerivedReferenceBuilder<AIn, BOut> = (...args) => {
  const instance = parseInt(args[0].instance, 10);

  return [{ typeId: 'B', instance, path: ':foo' }];
};

type C1In = TargetReference<{ typeId: 'C1'; instance: string }, ''>;
type C2In = TargetReference<{ typeId: 'C2'; instance: boolean }, ''>;

type CIn = [C1In, C2In];

type DOut = [
  TargetReference<
    { typeId: 'D'; instance: { c1: string; c2: boolean } },
    ':bar'
  >,
  // { typeId: 'B'; instance: number; path: `${string}` },
];

const buildReferences2: DerivedReferenceBuilder<CIn, DOut> = (...args) => {
  return [
    {
      typeId: 'D',
      instance: {
        c1: args[0].instance,
        c2: args[1].instance,
      },
      path: ':bar',
    },
  ];
};

type E1In = TargetReference<{ typeId: 'E1'; instance: string }, ''>;

type EIn = [E1In];

type FOut = [
  TargetReference<{ typeId: 'F'; instance: number }, 'foo/:bar'>,
  TargetReference<{ typeId: 'F'; instance: number }, `foo/${string}`>,
];

const buildReferences3: DerivedReferenceBuilder<EIn, FOut> = (...args) => {
  const instance: FOut[number]['instance'] = parseInt(args[0].instance, 10);
  return [
    {
      typeId: 'F',
      instance,
      path: 'foo/:bar',
    },
    {
      typeId: 'F',
      instance,
      path: `foo/${args[0].instance}`,
    },
  ] satisfies FOut;
};

type G1In = TargetReference<{ typeId: 'G1'; instance: string }, ''>;
type G2In = TargetReference<{ typeId: 'G2'; instance: number }, ''>;

type GIn = [G1In, G2In];

type HOut = [
  TargetReference<{ typeId: 'H'; instance: boolean }, 'bar/:baz'>,
  TargetReference<{ typeId: 'H'; instance: boolean }, `bar/${string}`>,
];

const buildReferences4: DerivedReferenceBuilder<GIn, HOut> = (...args) => {
  const instance: HOut[number]['instance'] =
    parseInt(args[0].instance, 10) === args[1].instance;

  return [
    {
      typeId: 'H',
      instance,
      path: 'bar/:baz',
    },
    {
      typeId: 'H',
      instance,
      path: `bar/${args[0].instance}_${args[1].instance}`,
    },
  ] satisfies HOut;
};

const targetReferenceConfigurationTuple = [
  buildStaticTargetReferenceConfiguration<
    '',
    TypedTargetFromTargetReference<A1In>,
    ''
  >({
    inputTargetPath: '',
    outputTargetReference: {
      typeId: 'A1',
      instance: '2',
      path: '',
    },
  }),
  {
    typeId:
      TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
    inputTypedTargeTuple: [
      {
        typeId: 'A1',
        instance: '2',
      },
    ],
    buildReferences:
      buildReferences1 as NormalizedDerivedReferenceBuilder<BOut>,
  } satisfies DerivedTargetReferenceConfiguration<AIn, BOut>,
  {
    typeId:
      TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
    inputTypedTargeTuple: [
      {
        typeId: 'C1',
        instance: 'hello',
      },
      {
        typeId: 'C2',
        instance: true,
      },
    ],
    buildReferences:
      buildReferences2 as NormalizedDerivedReferenceBuilder<DOut>,
  } satisfies DerivedTargetReferenceConfiguration<CIn, DOut>,
  {
    typeId:
      TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
    inputTypedTargeTuple: [
      {
        typeId: 'E1',
        instance: 'abc123',
      },
    ],
    buildReferences:
      buildReferences3 as NormalizedDerivedReferenceBuilder<FOut>,
  } satisfies DerivedTargetReferenceConfiguration<EIn, FOut>,
  {
    typeId:
      TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
    inputTypedTargeTuple: [
      {
        typeId: 'G1',
        instance: '2',
      },
      {
        typeId: 'G2',
        instance: 2,
      },
    ],
    buildReferences:
      buildReferences4 as NormalizedDerivedReferenceBuilder<HOut>,
  } satisfies DerivedTargetReferenceConfiguration<GIn, HOut>,
] satisfies UnknownTargetReferenceConfiguration[];

type CustomTargetReferenceConfigurationTuple =
  typeof targetReferenceConfigurationTuple;

const ruleConfigurationTuple = [
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    rule: (x) => {
      return x === 2;
    },
    targetTypeId: 'B',
    targetPath: ':foo',
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    rule: (x) => {
      return x.c2;
    },
    targetTypeId: 'D',
    targetPath: ':bar',
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    rule: (x) => {
      return !Number.isNaN(x);
    },
    targetTypeId: 'F',
    targetPath: 'foo/:bar',
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    rule: (x) => {
      return Number.isNaN(x);
    },
    targetTypeId: 'F',
    targetPath: 'foo/abc123',
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    rule: (x) => x,
    targetTypeId: 'H',
    targetPath: 'bar/:baz',
  }),
  buildRuleConfiguration<CustomTargetReferenceConfigurationTuple>({
    rule: (x) => x,
    targetTypeId: 'H',
    targetPath: 'bar/2_2',
  }),
] satisfies UnknownRuleConfiguration[];

constraintEngine.run({
  targetReferenceConfigurationTuple,
  ruleConfigurationTuple,
});
