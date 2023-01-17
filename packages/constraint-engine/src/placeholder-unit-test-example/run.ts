/**
 * @file This file serves as a temporary stand-in for proper unit tests
 * We're trying to get the constraint-engine working so we can use it to drive linting test coverage.
 */

import { buildDerivedTargetReferenceConfiguration } from '../configurationHelpers/buildDerivedTargetReferenceConfiguration';
import { buildRuleConfiguration } from '../configurationHelpers/buildRuleConfiguration';
import { buildStaticTargetReferenceConfiguration } from '../configurationHelpers/buildStaticTargetReferenceConfiguration';
import { constraintEngine } from '../engine/constraintEngine';
import {
  DerivedReferenceBuilder,
  NormalizedDerivedReferenceBuilder,
} from '../types/builders/derivedReferenceBuilder';
import {
  RuleConfigurationFromTargetReferenceConfigurationTuple,
  UnknownRuleConfiguration,
} from '../types/ruleConfiguration';
import { TargetReference } from '../types/targetReference';
import { DerivedTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { TypedTargetFromTargetReference } from '../types/typedTargetFromTargetReference';

type A1In = TargetReference<{ typeId: 'A1'; instance: string }, ''>;

type AIn = [A1In];

type BOut = [TargetReference<{ typeId: 'B'; instance: number }, ':foo'>];

const buildReferences1: DerivedReferenceBuilder<{
  InputTargetReferenceTuple: AIn;
  OutputTargetReferenceTuple: BOut;
}> = (...args) => {
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

const buildReferences2: DerivedReferenceBuilder<{
  InputTargetReferenceTuple: CIn;
  OutputTargetReferenceTuple: DOut;
}> = (...args) => {
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

const buildReferences3: DerivedReferenceBuilder<{
  InputTargetReferenceTuple: EIn;
  OutputTargetReferenceTuple: FOut;
}> = (...args) => {
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

const buildReferences4: DerivedReferenceBuilder<{
  InputTargetReferenceTuple: GIn;
  OutputTargetReferenceTuple: HOut;
}> = (...args) => {
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
  buildDerivedTargetReferenceConfiguration<{
    InputTargetReferenceTuple: AIn;
    OutputTargetReferenceTuple: BOut;
  }>({
    inputTypedTargeTuple: [
      {
        typeId: 'A1',
        instance: '2',
      },
    ],
    buildReferenceTuple: buildReferences1,
  }),
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
    buildReferenceTuple: buildReferences2 as NormalizedDerivedReferenceBuilder<{
      OutputTargetReferenceTuple: DOut;
    }>,
  } satisfies DerivedTargetReferenceConfiguration<{
    InputTargetReferenceTuple: CIn;
    OutputTargetReferenceTuple: DOut;
  }>,
  {
    typeId:
      TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
    inputTypedTargeTuple: [
      {
        typeId: 'E1',
        instance: 'abc123',
      },
    ],
    buildReferenceTuple: buildReferences3 as NormalizedDerivedReferenceBuilder<{
      OutputTargetReferenceTuple: FOut;
    }>,
  } satisfies DerivedTargetReferenceConfiguration<{
    InputTargetReferenceTuple: EIn;
    OutputTargetReferenceTuple: FOut;
  }>,
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
    buildReferenceTuple: buildReferences4 as NormalizedDerivedReferenceBuilder<{
      OutputTargetReferenceTuple: HOut;
    }>,
  } satisfies DerivedTargetReferenceConfiguration<{
    InputTargetReferenceTuple: GIn;
    OutputTargetReferenceTuple: HOut;
  }>,
] as const; // satisfies UnknownTargetReferenceConfigurationTuple;

type CustomTargetReferenceConfigurationTuple =
  typeof targetReferenceConfigurationTuple;

type IDK =
  RuleConfigurationFromTargetReferenceConfigurationTuple<CustomTargetReferenceConfigurationTuple>;

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
    rule: (x: number) => {
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
    rule: (x: boolean) => x,
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
