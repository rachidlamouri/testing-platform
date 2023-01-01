import { DerivedReferenceSetBuilder } from '../builders/derivedReferenceSetBuilder';
import { NormalizedTargetPath, UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

export type DerivedTargetReferenceSetConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.DerivedTargetReferenceSetConfiguration;
  buildReferenceSet: DerivedReferenceSetBuilder<
    TInputTypedTarget,
    TInputTargetPath,
    TOutputTypedTarget,
    TOutputTargetPath
  >;
  inputTargetTypeId: TInputTypedTarget['typeId'];
  normalizedInputTargetPath: NormalizedTargetPath<TInputTargetPath>;
  outputTargetTypeId: TOutputTypedTarget['typeId'];
  normalizedOutputTargetPath: NormalizedTargetPath<TOutputTargetPath>;
};

export type UnknownDerivedTargetReferenceSetConfiguration =
  DerivedTargetReferenceSetConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath
  >;
