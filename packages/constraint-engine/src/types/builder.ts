import { UnknownTypedTarget } from './typedTarget';
import { UnknownTargetPath } from './targetPath';
import { TargetReference } from './targetReference';
import { UnknownTargetInstance } from './targetInstance';

export type InstanceBuilder<
  TInputData extends UnknownTargetInstance,
  TOutputTargetInstance extends UnknownTargetInstance,
> = (inputData: TInputData) => TOutputTargetInstance;

export type ReferenceBuilder<
  TInputData extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputData: TInputData,
) => TargetReference<TOutputTypedTarget, TOutputTargetPath>;

export type DerivedReferenceBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
) => TargetReference<TOutputTypedTarget, TOutputTargetPath>;

export type ReferenceSetBuilder<
  TInputData extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputData: TInputData,
) => TargetReference<TOutputTypedTarget, TOutputTargetPath>[];

export type DerivedReferenceSetBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
) => TargetReference<TOutputTypedTarget, TOutputTargetPath>[];
