import { CustomSet } from '../utils/customSet';
import { Rule } from './rule';
import { UnknownTargetPath } from './targetPath';
import { DerivedTargetReferenceConfigurationWithNormalizedBuilder } from './targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { DerivedTargetReferenceSetConfigurationWithNormalizedBuilder } from './targetReferenceConfiguration/derivedTargetReferenceSetConfiguration';
import { UnknownTargetReferenceConfiguration } from './targetReferenceConfiguration/unknownTargetReferenceConfiguration';
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

export type UnknownRuleConfigurationSet = CustomSet<UnknownRuleConfiguration>;

type RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfiguration extends UnknownTargetReferenceConfiguration,
> =
  TTargetReferenceConfiguration extends DerivedTargetReferenceConfigurationWithNormalizedBuilder<
    UnknownTypedTarget,
    UnknownTargetPath,
    infer TOutputTypedTargetOptionsTuple,
    infer TOutputTargetPathTuple
  >
    ? // TODO: check if all permutations of target tuple and path tuple make sense
      RuleConfiguration<
        TOutputTypedTargetOptionsTuple[number],
        TOutputTargetPathTuple[number]
      >
    : TTargetReferenceConfiguration extends DerivedTargetReferenceSetConfigurationWithNormalizedBuilder<
        UnknownTypedTarget,
        UnknownTargetPath,
        infer TOutputTypedTarget,
        infer TOutputTargetPath
      >
    ? RuleConfiguration<TOutputTypedTarget, TOutputTargetPath>
    : never;

export type RuleConfigurationFromTargetReferenceConfigurations<
  TTargetReferenceConfigurations extends readonly UnknownTargetReferenceConfiguration[],
> = RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfigurations[number]
>;
