import { UnknownTargetInstance } from '../targetInstance';
import { UnknownTargetPath } from '../targetPath';
import { TargetReference } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';

export type ReferenceSetBuilder<
  TInputInstance extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputInstance: TInputInstance,
) => TargetReference<TOutputTypedTarget, TOutputTargetPath>[];
