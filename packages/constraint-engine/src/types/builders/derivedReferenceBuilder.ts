import { UnknownTargetPath } from '../targetPath';
import { TargetReference } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';

export type KnownDerivedReferenceBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = (
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
) => TargetReference<TOutputTypedTargetOptionsTuple[number], TOutputTargetPath>;

export type PartiallyKnownDerivedReferenceBuilder<
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = KnownDerivedReferenceBuilder<
  UnknownTypedTarget,
  UnknownTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPath
>;
