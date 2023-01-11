import { InferableGuardRule, GuardRule } from '../rule';
import { UnknownTargetInstance } from '../targetInstance';
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
  TInputTargetInstance extends UnknownTargetInstance,
  TGuardRuleTuple extends readonly InferableGuardRule<TInputTargetInstance>[],
> = {
  [Index in keyof TGuardRuleTuple]: TGuardRuleTuple[Index] extends GuardRule<
    TInputTargetInstance,
    infer TNarrowedTargetInstance
  >
    ? TNarrowedTargetInstance
    : never;
};

export type GuardRuleTupleNarrowedTargetIntersection<
  TInputTargetInstance extends UnknownTargetInstance,
  TGuardRuleTuple extends readonly InferableGuardRule<TInputTargetInstance>[],
> = TupleToIntersection<
  GuardRuleTupleToNarrowedTargetTuple<TInputTargetInstance, TGuardRuleTuple>
>;

export type EvaluateGuardRuleTuple<
  TInputTypedTarget extends UnknownTypedTarget,
  TGuardRuleTuple extends readonly InferableGuardRule<
    TInputTypedTarget['instance']
  >[],
  TOutputTargetInstance extends TInputTypedTarget['instance'],
  TNarrowOption,
  TIdentityOption,
> = GuardRuleTupleNarrowedTargetIntersection<
  TInputTypedTarget['instance'],
  TGuardRuleTuple
> extends TOutputTargetInstance
  ? TNarrowOption
  : TIdentityOption;

export type NarrowedReferenceBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTargetTypeId extends UnknownTargetTypeId,
  TOutputTargetInstance extends TInputTypedTarget['instance'],
> = (
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
) => TargetReferenceTuple<
  TypedTarget<TOutputTargetTypeId, TOutputTargetInstance>,
  [TInputTargetPath]
>;

export type IdentityReferenceBuilder<
  TTypedTarget extends UnknownTypedTarget,
  TTargetPath extends UnknownTargetPath,
> = (
  inputReference: TargetReference<TTypedTarget, TTargetPath>,
) => TargetReferenceTuple<TTypedTarget, [TTargetPath]>;

export type CastReferenceBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TGuardRuleTuple extends readonly InferableGuardRule<
    TInputTypedTarget['instance']
  >[],
  TOutputTargetTypeId extends UnknownTargetTypeId,
  TOutputTargetInstance extends TInputTypedTarget['instance'],
> = EvaluateGuardRuleTuple<
  TInputTypedTarget,
  TGuardRuleTuple,
  TOutputTargetInstance,
  NarrowedReferenceBuilder<
    TInputTypedTarget,
    TInputTargetPath,
    TOutputTargetTypeId,
    TOutputTargetInstance
  >,
  IdentityReferenceBuilder<TInputTypedTarget, TInputTargetPath>
>;
