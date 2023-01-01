import { DerivedReferenceSetBuilder } from '../builders/derivedReferenceSetBuilder';
import { NormalizedTargetPath, UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

type DerivedTargetReferenceSetConfiguration<
  TActualInputTypedTarget extends UnknownTypedTarget,
  TActualInputTargetPath extends UnknownTargetPath,
  TExpectedInputTypedTarget extends UnknownTypedTarget,
  TExpectedInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.DerivedTargetReferenceSetConfiguration;
  buildReferenceSet: DerivedReferenceSetBuilder<
    TActualInputTypedTarget,
    TActualInputTargetPath,
    TOutputTypedTarget,
    TOutputTargetPath
  >;
  inputTargetTypeId: TExpectedInputTypedTarget['typeId'];
  normalizedInputTargetPath: NormalizedTargetPath<TExpectedInputTargetPath>;
  outputTargetTypeId: TOutputTypedTarget['typeId'];
  normalizedOutputTargetPath: NormalizedTargetPath<TOutputTargetPath>;
};

export type KnownDerivedTargetReferenceSetConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = DerivedTargetReferenceSetConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
>;

export type PartiallyKnownDerivedTargetReferenceSetConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = DerivedTargetReferenceSetConfiguration<
  UnknownTypedTarget,
  UnknownTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
>;

export type UnknownDerivedTargetReferenceSetConfiguration =
  DerivedTargetReferenceSetConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath
  >;
