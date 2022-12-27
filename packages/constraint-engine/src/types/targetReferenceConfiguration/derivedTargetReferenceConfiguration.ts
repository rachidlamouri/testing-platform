import { DerivedReferenceBuilder } from '../builder';
import { NormalizedTargetPath, UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

export type DerivedTargetReferenceConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration;
  buildReference: DerivedReferenceBuilder<
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

export type UnknownDerivedTargetReferenceConfiguration =
  DerivedTargetReferenceConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath
  >;
