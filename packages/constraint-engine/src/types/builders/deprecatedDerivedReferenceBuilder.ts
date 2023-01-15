import { UnknownTargetPath, UnknownTargetPathTuple } from '../targetPath';
import { TargetReference, TargetReferenceTuple } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';

/** @deprecated */
export type DeprecatedDerivedReferenceBuilder<
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

/** @deprecated */
export type NormalizedDeprecatedDerivedReferenceBuilder<
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = DeprecatedDerivedReferenceBuilder<
  UnknownTypedTarget,
  UnknownTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
>;
