import {
  GuardRuleTupleNarrowedTargetIntersection,
  NarrowedReferenceBuilder,
} from '../types/builders/narrowedReferenceBuilder';
import { InferableGuardRule } from '../types/rule';
import { UnknownTargetPath } from '../types/targetPath';
import {
  TypedTarget,
  UnknownTargetTypeId,
  UnknownTypedTarget,
} from '../types/typedTarget';

export const buildNarrowedReferenceBuilder = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TGuardRuleTuple extends readonly InferableGuardRule[],
  TOutputTypedTarget extends TypedTarget<
    UnknownTargetTypeId,
    GuardRuleTupleNarrowedTargetIntersection<TGuardRuleTuple>
  >,
>(
  outputTargetTypeId: TOutputTypedTarget['typeId'],
): NarrowedReferenceBuilder<
  TInputTypedTarget,
  TInputTargetPath,
  TGuardRuleTuple,
  TOutputTypedTarget
> => {
  const buildNarrowedReference: NarrowedReferenceBuilder<
    TInputTypedTarget,
    TInputTargetPath,
    TGuardRuleTuple,
    TOutputTypedTarget
  > = (inputReference) => ({
    typeId: outputTargetTypeId,
    instance: inputReference.instance as TOutputTypedTarget['instance'],
    path: inputReference.path,
  });

  return buildNarrowedReference;
};
