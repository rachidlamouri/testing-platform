import { UnknownTargetPath } from '../targetPath';
import { TargetReference } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';

export type KnownDerivedReferenceBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptions extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
) => TargetReference<TOutputTypedTargetOptions[number], TOutputTargetPath>;

export type PartiallyKnownDerivedReferenceBuilder<
  TOutputTypedTargetOptions extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = KnownDerivedReferenceBuilder<
  UnknownTypedTarget,
  UnknownTargetPath,
  TOutputTypedTargetOptions,
  TOutputTargetPath
>;
