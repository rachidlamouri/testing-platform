import { CustomSet } from '../utils/customSet';
import { DeprecatedDerivedReferenceBuilderInputAndOutput } from './builders/deprecatedDerivedReferenceBuilder';
import { DeprecatedDerivedReferenceSetBuilderInputAndOutput } from './builders/deprecatedDerivedReferenceSetBuilder';
import { DerivedTargetReferenceBuilderInputAndOutput } from './builders/derivedReferenceBuilder';
import { Rule } from './rule';
import { UnknownTargetPath } from './targetPath';
import { UnknownTargetReferenceTuple } from './targetReference';
import { DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder } from './targetReferenceConfiguration/deprecatedDerivedTargetReferenceConfiguration';
import { DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedBuilder } from './targetReferenceConfiguration/deprecatedDerivedTargetReferenceSetConfiguration';
import { DerivedTargetReferenceConfiguration } from './targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import {
  UnknownTargetReferenceConfiguration,
  UnknownTargetReferenceConfigurationTuple,
} from './targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { UnknownTypedTarget } from './typedTarget';
import { TypedTargetFromTargetReference } from './typedTargetFromTargetReference';

type BaseRuleConfiguration<
  TActualTypedTarget extends UnknownTypedTarget,
  TExpectedTypedTarget extends UnknownTypedTarget,
  TTargetPath extends UnknownTargetPath,
> = {
  rule: Rule<TActualTypedTarget['instance']>;
  targetTypeId: TExpectedTypedTarget['typeId'];
  targetPath: TTargetPath;
};

type RuleConfiguration<
  TTypedTarget extends UnknownTypedTarget,
  TTargetPath extends UnknownTargetPath,
> = BaseRuleConfiguration<TTypedTarget, TTypedTarget, TTargetPath>;

export type RuleConfigurationFromTargetReferenceTuple<
  T extends UnknownTargetReferenceTuple,
> = {
  [I in keyof T]: {
    rule: Rule<T[I]['instance']>;
    targetTypeId: T[I]['typeId'];
    targetPath: T[I]['path'];
  };
}[number];

export type UnknownRuleConfiguration = BaseRuleConfiguration<
  UnknownTypedTarget,
  UnknownTypedTarget,
  UnknownTargetPath
>;

export type UnknownRuleConfigurationTuple = readonly UnknownRuleConfiguration[];

export type UnknownRuleConfigurationSet = CustomSet<UnknownRuleConfiguration>;

export type RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfiguration extends UnknownTargetReferenceConfiguration,
> =
  TTargetReferenceConfiguration extends DerivedTargetReferenceConfiguration<DerivedTargetReferenceBuilderInputAndOutput>
    ? RuleConfigurationFromTargetReferenceTuple<
        ReturnType<TTargetReferenceConfiguration['buildReferenceTuple']>
      >
    : TTargetReferenceConfiguration extends DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder<
        infer T extends DeprecatedDerivedReferenceBuilderInputAndOutput
      >
    ? // TODO: check if all permutations of target tuple and path tuple make sense
      RuleConfiguration<
        T['OutputTypedTargetOptionsTuple'][number],
        T['OutputTargetPathTuple'][number]
      >
    : TTargetReferenceConfiguration extends DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedBuilder<
        infer T extends DeprecatedDerivedReferenceSetBuilderInputAndOutput
      >
    ? RuleConfiguration<T['OutputTypedTarget'], T['OutputTargetPath']>
    : never;

export type RuleConfigurationTupleFromTargetReferenceConfigurationTuple<
  TTargetReferenceConfigurationTuple extends UnknownTargetReferenceConfigurationTuple,
> = {
  [Index in keyof TTargetReferenceConfigurationTuple]: RuleConfigurationFromTargetReferenceConfiguration<
    TTargetReferenceConfigurationTuple[Index]
  >;
};

export type RuleConfigurationFromTargetReferenceConfigurationTuple<
  TTargetReferenceConfigurationTuple extends UnknownTargetReferenceConfigurationTuple,
> =
  RuleConfigurationTupleFromTargetReferenceConfigurationTuple<TTargetReferenceConfigurationTuple>[number];
