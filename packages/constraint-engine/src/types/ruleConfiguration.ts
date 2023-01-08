import { Rule } from './rule';
import { UnknownTargetInstance } from './targetInstance';
import { NormalizedTargetPath, UnknownTargetPath } from './targetPath';
import { PartiallyKnownDerivedTargetReferenceConfiguration } from './targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { PartiallyKnownDerivedTargetReferenceSetConfiguration } from './targetReferenceConfiguration/derivedTargetReferenceSetConfiguration';
import { PartiallyKnownRootTargetReferenceConfiguration } from './targetReferenceConfiguration/rootTargetReferenceConfiguration';
import { UnknownTargetReferenceConfiguration } from './targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { UnknownTypedTarget } from './typedTarget';

type RuleConfiguration<
  TActualTypedTarget extends UnknownTypedTarget,
  TExpectedTypedTarget extends UnknownTypedTarget,
  TNormalizedPath extends UnknownTargetPath,
> = {
  rule: Rule<TActualTypedTarget['instance']>;
  targetTypeId: TExpectedTypedTarget['typeId'];
  normalizedTargetPath: TNormalizedPath;
};

export type KnownRuleConfiguration<
  TTypedTarget extends UnknownTypedTarget,
  TNormalizedPath extends UnknownTargetPath,
> = RuleConfiguration<TTypedTarget, TTypedTarget, TNormalizedPath>;

export type PartiallyKnownRuleConfiguration<
  TTypedTarget extends UnknownTypedTarget,
  TNormalizedPath extends UnknownTargetPath,
> = RuleConfiguration<UnknownTypedTarget, TTypedTarget, TNormalizedPath>;

export type UnknownRuleConfiguration = RuleConfiguration<
  UnknownTypedTarget,
  UnknownTypedTarget,
  UnknownTargetPath
>;

type RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfiguration extends UnknownTargetReferenceConfiguration,
> =
  TTargetReferenceConfiguration extends PartiallyKnownRootTargetReferenceConfiguration<
    UnknownTargetInstance,
    infer TOutputTypedTarget,
    infer TOutputTargetPath
  >
    ? KnownRuleConfiguration<
        TOutputTypedTarget,
        NormalizedTargetPath<TOutputTargetPath>
      >
    : TTargetReferenceConfiguration extends PartiallyKnownDerivedTargetReferenceConfiguration<
        UnknownTypedTarget,
        UnknownTargetPath,
        infer TOutputTypedTargetOptionsTuple,
        infer TOutputTargetPath
      >
    ? KnownRuleConfiguration<
        TOutputTypedTargetOptionsTuple[number],
        NormalizedTargetPath<TOutputTargetPath>
      >
    : TTargetReferenceConfiguration extends PartiallyKnownDerivedTargetReferenceSetConfiguration<
        UnknownTypedTarget,
        UnknownTargetPath,
        infer TOutputTypedTarget,
        infer TOutputTargetPath
      >
    ? KnownRuleConfiguration<
        TOutputTypedTarget,
        NormalizedTargetPath<TOutputTargetPath>
      >
    : never;

export type RuleConfigurationFromTargetReferenceConfigurations<
  TTargetReferenceConfigurations extends readonly UnknownTargetReferenceConfiguration[],
> = RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfigurations[number]
>;
