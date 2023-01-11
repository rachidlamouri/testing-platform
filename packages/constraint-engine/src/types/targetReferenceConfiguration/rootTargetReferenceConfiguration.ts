import { ReferenceBuilder } from '../builders/referenceBuilder';
import { UnknownTargetInstance } from '../targetInstance';
import { RootTargetPath, UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

type RootTargetReferenceConfiguration<
  TActualInputInstance extends UnknownTargetInstance,
  TExpectedInputInstance extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.RootTargetReferenceConfiguration;
  buildReference: ReferenceBuilder<
    TActualInputInstance,
    TOutputTypedTarget,
    TOutputTargetPath
  >;
  inputInstance: TExpectedInputInstance;
  inputTargetPath: RootTargetPath;
  outputTargetTypeId: TOutputTypedTarget['typeId'];
  outputTargetPath: TOutputTargetPath;
};

export type KnownRootTargetReferenceConfiguration<
  TInputInstance extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = RootTargetReferenceConfiguration<
  TInputInstance,
  TInputInstance,
  TOutputTypedTarget,
  TOutputTargetPath
>;

export type PartiallyKnownRootTargetReferenceConfiguration<
  TInputInstance extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = RootTargetReferenceConfiguration<
  UnknownTargetInstance,
  TInputInstance,
  TOutputTypedTarget,
  TOutputTargetPath
>;

export type UnknownRootTargetReferenceConfiguration =
  RootTargetReferenceConfiguration<
    UnknownTargetInstance,
    UnknownTargetInstance,
    UnknownTypedTarget,
    UnknownTargetPath
  >;
