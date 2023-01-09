import { ReferenceBuilder } from '../builders/referenceBuilder';
import { UnknownTargetInstance } from '../targetInstance';
import { RootTargetPath, UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

type RootTargetReferenceConfiguration<
  TActualInputData extends UnknownTargetInstance,
  TExpectedInputData extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.RootTargetReferenceConfiguration;
  buildReference: ReferenceBuilder<
    TActualInputData,
    TOutputTypedTarget,
    TOutputTargetPath
  >;
  inputData: TExpectedInputData;
  inputTargetPath: RootTargetPath;
  outputTargetTypeId: TOutputTypedTarget['typeId'];
  outputTargetPath: TOutputTargetPath;
};

export type KnownRootTargetReferenceConfiguration<
  TInputData extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = RootTargetReferenceConfiguration<
  TInputData,
  TInputData,
  TOutputTypedTarget,
  TOutputTargetPath
>;

export type PartiallyKnownRootTargetReferenceConfiguration<
  TInputData extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = RootTargetReferenceConfiguration<
  UnknownTargetInstance,
  TInputData,
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
