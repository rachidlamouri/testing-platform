import { Rule } from './rule';
import { NormalizedTargetPath, UnknownTargetPath } from './targetPath';
import { DerivedTargetReferenceConfiguration } from './targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { DerivedTargetReferenceSetConfiguration } from './targetReferenceConfiguration/derivedTargetReferenceSetConfiguration';
import { RootTargetReferenceConfiguration } from './targetReferenceConfiguration/rootTargetReferenceConfiguration';
import { UnknownTargetReferenceConfiguration } from './targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { UnknownTypedTarget } from './typedTarget';

export type RuleConfiguration<
  TTypedTarget extends UnknownTypedTarget,
  TNormalizedPath extends UnknownTargetPath,
> = {
  rule: Rule<TTypedTarget['instance']>;
  targetTypeId: TTypedTarget['typeId'];
  normalizedTargetPath: TNormalizedPath;
};

export type UnknownRuleConfiguration = RuleConfiguration<
  UnknownTypedTarget,
  UnknownTargetPath
>;

type RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfiguration extends UnknownTargetReferenceConfiguration,
> = TTargetReferenceConfiguration extends RootTargetReferenceConfiguration<
  any,
  infer TOutputTypedTarget,
  infer TOutputTargetPath
>
  ? RuleConfiguration<
      TOutputTypedTarget,
      NormalizedTargetPath<TOutputTargetPath>
    >
  : TTargetReferenceConfiguration extends DerivedTargetReferenceConfiguration<
      any,
      any,
      infer TOutputTypedTarget,
      infer TOutputTargetPath
    >
  ? RuleConfiguration<
      TOutputTypedTarget,
      NormalizedTargetPath<TOutputTargetPath>
    >
  : TTargetReferenceConfiguration extends DerivedTargetReferenceSetConfiguration<
      any,
      any,
      infer TOutputTypedTarget,
      infer TOutputTargetPath
    >
  ? RuleConfiguration<
      TOutputTypedTarget,
      NormalizedTargetPath<TOutputTargetPath>
    >
  : never;

export type RuleConfigurationFromTargetReferenceConfigurations<
  TTargetReferenceConfigurations extends readonly any[],
> = RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfigurations[number]
>;
