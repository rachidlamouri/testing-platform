import { UnknownTargetInstance } from '../targetInstance';
import { UnknownTargetPath } from '../targetPath';
import { TargetReference } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';

export type ReferenceBuilder<
  TInputData extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputData: TInputData,
) => TargetReference<TOutputTypedTarget, TOutputTargetPath>;
