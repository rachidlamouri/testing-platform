import { DerivedReferenceSetBuilder } from '../builders/deprecatedDerivedReferenceSetBuilder';
import { UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

type BaseDerivedTargetReferenceSetConfiguration<
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
  inputTargetPath: TExpectedInputTargetPath;
  outputTargetTypeId: TOutputTypedTarget['typeId'];
  outputTargetPath: TOutputTargetPath;
};

export type DerivedTargetReferenceSetConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = BaseDerivedTargetReferenceSetConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
>;

export type DerivedTargetReferenceSetConfigurationWithNormalizedBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = BaseDerivedTargetReferenceSetConfiguration<
  UnknownTypedTarget,
  UnknownTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
>;

export type UnknownDerivedTargetReferenceSetConfiguration =
  BaseDerivedTargetReferenceSetConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath
  >;
