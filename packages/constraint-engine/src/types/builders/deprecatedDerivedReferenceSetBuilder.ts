import { UnknownTargetPath } from '../targetPath';
import { TargetReference } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';

/** @deprecated */
export type DeprecatedDerivedReferenceSetBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
) => TargetReference<TOutputTypedTarget, TOutputTargetPath>[];

/** @deprecated */
export type NormalizedDeprecatedDerivedReferenceSetBuilder<
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = DeprecatedDerivedReferenceSetBuilder<
  UnknownTypedTarget,
  UnknownTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
>;
