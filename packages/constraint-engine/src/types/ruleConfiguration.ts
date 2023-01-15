import { CustomSet } from '../utils/customSet';
import { Rule } from './rule';
import { UnknownTargetPath } from './targetPath';
import { DeprecatedDerivedTargetReferenceConfigurationWithNormalizedInput } from './targetReferenceConfiguration/deprecatedDerivedTargetReferenceConfiguration';
import { DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedInput } from './targetReferenceConfiguration/deprecatedDerivedTargetReferenceSetConfiguration';
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

export type RuleConfiguration<
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
  TTargetReferenceConfiguration extends DeprecatedDerivedTargetReferenceConfigurationWithNormalizedInput<
    infer TOutputTypedTargetOptionsTuple,
    infer TOutputTargetPathTuple
  >
    ? // TODO: check if all permutations of target tuple and path tuple make sense
      RuleConfiguration<
        TOutputTypedTargetOptionsTuple[number],
        TOutputTargetPathTuple[number]
      >
    : TTargetReferenceConfiguration extends DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedInput<
        infer TOutputTypedTarget,
        infer TOutputTargetPath
      >
    ? RuleConfiguration<TOutputTypedTarget, TOutputTargetPath>
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
