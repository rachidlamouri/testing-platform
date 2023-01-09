import { UnknownTargetPath, UnknownTargetPathTuple } from '../targetPath';
import { TargetReference, TargetReferenceTuple } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';

export type KnownDerivedReferenceBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = (
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
) => TargetReferenceTuple<
  TOutputTypedTargetOptionsTuple[number],
  TOutputTargetPathTuple
>;

export type PartiallyKnownDerivedReferenceBuilder<
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = KnownDerivedReferenceBuilder<
  UnknownTypedTarget,
  UnknownTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
>;
