import { UnknownTargetInstance } from '../targetInstance';
import { UnknownTargetPath } from '../targetPath';
import { TargetReference } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';

export type ReferenceBuilder<
  TInputInstance extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputInstance: TInputInstance,
) => TargetReference<TOutputTypedTarget, TOutputTargetPath>;

export type PartiallyKnownReferenceBuilder<
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = ReferenceBuilder<
  UnknownTargetInstance,
  TOutputTypedTarget,
  TOutputTargetPath
>;
