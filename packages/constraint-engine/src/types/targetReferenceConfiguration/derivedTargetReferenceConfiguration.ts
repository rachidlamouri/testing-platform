import { KnownDerivedReferenceBuilder } from '../builders/derivedReferenceBuilder';
import { Rule } from '../rule';
import { NormalizedTargetPath, UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

type DerivedTargetReferenceConfiguration<
  TActualInputTypedTarget extends UnknownTypedTarget,
  TActualInputTargetPath extends UnknownTargetPath,
  TExpectedInputTypedTarget extends UnknownTypedTarget,
  TExpectedInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptions extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration;
  buildReference: KnownDerivedReferenceBuilder<
    TActualInputTypedTarget,
    TActualInputTargetPath,
    TOutputTypedTargetOptions,
    TOutputTargetPath
  >;
  inputTargetTypeId: TExpectedInputTypedTarget['typeId'];
  normalizedInputTargetPath: NormalizedTargetPath<TExpectedInputTargetPath>;
  outputTargetTypeId: {
    [Index in keyof TOutputTypedTargetOptions]: TOutputTypedTargetOptions[Index]['typeId'];
  };
  normalizedOutputTargetPath: NormalizedTargetPath<TOutputTargetPath>;
  conditions: Rule<TActualInputTypedTarget['instance']>[];
};

export type KnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptions extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = DerivedTargetReferenceConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptions,
  TOutputTargetPath
>;

export type PartiallyKnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptions extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = DerivedTargetReferenceConfiguration<
  UnknownTypedTarget,
  UnknownTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptions,
  TOutputTargetPath
>;

export type UnknownDerivedTargetReferenceConfiguration =
  DerivedTargetReferenceConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath,
    [UnknownTypedTarget],
    UnknownTargetPath
  >;
