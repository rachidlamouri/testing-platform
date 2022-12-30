import { Rule } from './rule';
import { AnyTargetInstance } from './targetInstance';
import {
  AnyTargetPath,
  NormalizedTargetPath,
  UnknownTargetPath,
} from './targetPath';
import { DerivedTargetReferenceConfiguration } from './targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { DerivedTargetReferenceSetConfiguration } from './targetReferenceConfiguration/derivedTargetReferenceSetConfiguration';
import { RootTargetReferenceConfiguration } from './targetReferenceConfiguration/rootTargetReferenceConfiguration';
import { UnknownTargetReferenceConfiguration } from './targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { AnyTypedTarget, UnknownTypedTarget } from './typedTarget';

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
  AnyTargetInstance,
  infer TOutputTypedTarget,
  infer TOutputTargetPath
>
  ? RuleConfiguration<
      TOutputTypedTarget,
      NormalizedTargetPath<TOutputTargetPath>
    >
  : TTargetReferenceConfiguration extends DerivedTargetReferenceConfiguration<
      AnyTypedTarget,
      AnyTargetPath,
      infer TOutputTypedTarget,
      infer TOutputTargetPath
    >
  ? RuleConfiguration<
      TOutputTypedTarget,
      NormalizedTargetPath<TOutputTargetPath>
    >
  : TTargetReferenceConfiguration extends DerivedTargetReferenceSetConfiguration<
      AnyTypedTarget,
      AnyTargetPath,
      infer TOutputTypedTarget,
      infer TOutputTargetPath
    >
  ? RuleConfiguration<
      TOutputTypedTarget,
      NormalizedTargetPath<TOutputTargetPath>
    >
  : never;

export type RuleConfigurationFromTargetReferenceConfigurations<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TTargetReferenceConfigurations extends readonly any[],
> = RuleConfigurationFromTargetReferenceConfiguration<
  TTargetReferenceConfigurations[number]
>;
