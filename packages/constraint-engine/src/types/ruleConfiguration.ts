import { CustomSet } from '../utils/customSet';
import { Rule } from './rule';
import { UnknownTargetInstance } from './targetInstance';
import { UnknownTargetPath } from './targetPath';
import { PartiallyKnownDerivedTargetReferenceConfiguration } from './targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { PartiallyKnownDerivedTargetReferenceSetConfiguration } from './targetReferenceConfiguration/derivedTargetReferenceSetConfiguration';
import { PartiallyKnownRootTargetReferenceConfiguration } from './targetReferenceConfiguration/rootTargetReferenceConfiguration';
import { UnknownTargetReferenceConfiguration } from './targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { UnknownTypedTarget } from './typedTarget';

type RuleConfiguration<
  TActualTypedTarget extends UnknownTypedTarget,
  TExpectedTypedTarget extends UnknownTypedTarget,
  TTargetPath extends UnknownTargetPath,
> = {
  rule: Rule<TActualTypedTarget['instance']>;
  targetTypeId: TExpectedTypedTarget['typeId'];
  targetPath: TTargetPath;
};

export type KnownRuleConfiguration<
  TTypedTarget extends UnknownTypedTarget,
  TTargetPath extends UnknownTargetPath,
> = RuleConfiguration<TTypedTarget, TTypedTarget, TTargetPath>;

export type PartiallyKnownRuleConfiguration<
  TTypedTarget extends UnknownTypedTarget,
  TTargetPath extends UnknownTargetPath,
> = RuleConfiguration<UnknownTypedTarget, TTypedTarget, TTargetPath>;

export type UnknownRuleConfiguration = RuleConfiguration<
  UnknownTypedTarget,
  UnknownTypedTarget,
  UnknownTargetPath
>;

export type UnknownRuleConfigurationSet = CustomSet<UnknownRuleConfiguration>;

type RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfiguration extends UnknownTargetReferenceConfiguration,
> =
  TTargetReferenceConfiguration extends PartiallyKnownRootTargetReferenceConfiguration<
    UnknownTargetInstance,
    infer TOutputTypedTarget,
    infer TOutputTargetPath
  >
    ? KnownRuleConfiguration<TOutputTypedTarget, TOutputTargetPath>
    : TTargetReferenceConfiguration extends PartiallyKnownDerivedTargetReferenceConfiguration<
        UnknownTypedTarget,
        UnknownTargetPath,
        infer TOutputTypedTargetOptionsTuple,
        infer TOutputTargetPath
      >
    ? KnownRuleConfiguration<
        TOutputTypedTargetOptionsTuple[number],
        TOutputTargetPath
      >
    : TTargetReferenceConfiguration extends PartiallyKnownDerivedTargetReferenceSetConfiguration<
        UnknownTypedTarget,
        UnknownTargetPath,
        infer TOutputTypedTarget,
        infer TOutputTargetPath
      >
    ? KnownRuleConfiguration<TOutputTypedTarget, TOutputTargetPath>
    : never;

export type RuleConfigurationFromTargetReferenceConfigurations<
  TTargetReferenceConfigurations extends readonly UnknownTargetReferenceConfiguration[],
> = RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfigurations[number]
>;
