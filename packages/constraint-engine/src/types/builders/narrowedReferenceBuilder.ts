import { InferableGuardRule, GuardRule } from '../rule';
import { InferableTargetInstance } from '../targetInstance';
import { UnknownTargetPath } from '../targetPath';
import { TargetReference, TargetReferenceTuple } from '../targetReference';
import {
  TypedTarget,
  UnknownTargetTypeId,
  UnknownTypedTarget,
} from '../typedTarget';

type TupleToIntersection<TTuple extends readonly unknown[]> = TTuple extends [
  infer TOnlyItem,
]
  ? TOnlyItem
  : TTuple extends [infer TFirstItem, ...infer TRestItems]
  ? TFirstItem & TupleToIntersection<TRestItems>
  : never;

type GuardRuleTupleToNarrowedTargetTuple<
  TGuardRuleTuple extends readonly InferableGuardRule[],
> = {
  [Index in keyof TGuardRuleTuple]: TGuardRuleTuple[Index] extends GuardRule<
    InferableTargetInstance,
    infer TNarrowedTargetInstance
  >
    ? TNarrowedTargetInstance
    : never;
};

export type GuardRuleTupleNarrowedTargetIntersection<
  TGuardRuleTuple extends readonly InferableGuardRule[],
> = TupleToIntersection<GuardRuleTupleToNarrowedTargetTuple<TGuardRuleTuple>>;

export type NarrowedReferenceBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TGuardRuleTuple extends readonly InferableGuardRule[],
  TOutputTypedTarget extends TypedTarget<
    UnknownTargetTypeId,
    GuardRuleTupleNarrowedTargetIntersection<TGuardRuleTuple>
  >,
> = (
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
) => TargetReferenceTuple<TOutputTypedTarget, [TInputTargetPath]>;
