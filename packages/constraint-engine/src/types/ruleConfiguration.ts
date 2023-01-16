import { CustomSet } from '../utils/customSet';
import { DeprecatedDerivedReferenceBuilderInputAndOutput } from './builders/deprecatedDerivedReferenceBuilder';
import { DeprecatedDerivedReferenceSetBuilderInputAndOutput } from './builders/deprecatedDerivedReferenceSetBuilder';
import { Rule } from './rule';
import { UnknownTargetPath } from './targetPath';
import { DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder } from './targetReferenceConfiguration/deprecatedDerivedTargetReferenceConfiguration';
import { DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedBuilder } from './targetReferenceConfiguration/deprecatedDerivedTargetReferenceSetConfiguration';
import {
  UnknownTargetReferenceConfiguration,
  UnknownTargetReferenceConfigurationTuple,
} from './targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { UnknownTypedTarget } from './typedTarget';

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

export type UnknownRuleConfiguration = BaseRuleConfiguration<
  UnknownTypedTarget,
  UnknownTypedTarget,
  UnknownTargetPath
>;

export type UnknownRuleConfigurationTuple = readonly UnknownRuleConfiguration[];

export type UnknownRuleConfigurationSet = CustomSet<UnknownRuleConfiguration>;

type RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfiguration extends UnknownTargetReferenceConfiguration,
> =
  TTargetReferenceConfiguration extends DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder<
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
