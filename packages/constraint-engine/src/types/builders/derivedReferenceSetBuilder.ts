import { UnknownTargetPath } from '../targetPath';
import { TargetReference } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';

export type DerivedReferenceSetBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
) => TargetReference<TOutputTypedTarget, TOutputTargetPath>[];

export type PartiallyKnownDerivedReferenceSetBuilder<
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = DerivedReferenceSetBuilder<
  UnknownTypedTarget,
  UnknownTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
>;
