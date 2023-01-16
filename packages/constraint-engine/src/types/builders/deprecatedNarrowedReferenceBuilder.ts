import { InferableGuardRule, GuardRule } from '../rule';
import { UnknownTargetInstance } from '../targetInstance';
import { UnknownTargetPath } from '../targetPath';
import { TargetReference, TargetReferenceTuple } from '../targetReference';
import {
  TypedTarget,
  UnknownTargetTypeId,
  UnknownTypedTarget,
} from '../typedTarget';
import { MergeTuple } from '../utilityTypes/merge/mergeTuple';

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
> = MergeTuple<
  GuardRuleTupleToNarrowedTargetTuple<TInputTargetInstance, TGuardRuleTuple>
>;

export type DeprecatedNarrowedReferenceBuilderInput = {
  InputTypedTarget: UnknownTypedTarget;
  InputTargetPath: UnknownTargetPath;
};

export type DeprecatedNarrowedReferenceBuilderConstrainedOutput<
  T extends DeprecatedNarrowedReferenceBuilderInput,
> = {
  GuardRuleTuple: readonly InferableGuardRule<
    T['InputTypedTarget']['instance']
  >[];
  OutputTargetTypeId: UnknownTargetTypeId;
  OutputTargetInstance: T['InputTypedTarget']['instance'];
};

export type EvaluationResultOptions = {
  IdentityOption: unknown;
  NarrowedOption: unknown;
};

export type EvaluateGuardRuleTuple<
  T1 extends DeprecatedNarrowedReferenceBuilderInput,
  T2 extends DeprecatedNarrowedReferenceBuilderConstrainedOutput<T1>,
  T3 extends EvaluationResultOptions,
> = GuardRuleTupleNarrowedTargetIntersection<
  T1['InputTypedTarget']['instance'],
  T2['GuardRuleTuple']
> extends T2['OutputTargetInstance']
  ? T3['NarrowedOption']
  : T3['IdentityOption'];

export type DeprecatedNarrowedReferenceBuilder<
  T1 extends DeprecatedNarrowedReferenceBuilderInput,
  T2 extends DeprecatedNarrowedReferenceBuilderConstrainedOutput<T1>,
> = (
  inputReference: TargetReference<
    T1['InputTypedTarget'],
    T1['InputTargetPath']
  >,
) => TargetReferenceTuple<
  TypedTarget<T2['OutputTargetTypeId'], T2['OutputTargetInstance']>,
  [T1['InputTargetPath']]
>;

export type IdentityReferenceBuilder<
  TTypedTarget extends UnknownTypedTarget,
  TTargetPath extends UnknownTargetPath,
> = (
  inputReference: TargetReference<TTypedTarget, TTargetPath>,
) => TargetReferenceTuple<TTypedTarget, [TTargetPath]>;

export type CastReferenceBuilder<
  T1 extends DeprecatedNarrowedReferenceBuilderInput,
  T2 extends DeprecatedNarrowedReferenceBuilderConstrainedOutput<T1>,
> = EvaluateGuardRuleTuple<
  T1,
  T2,
  {
    IdentityOption: IdentityReferenceBuilder<
      T1['InputTypedTarget'],
      T1['InputTargetPath']
    >;
    NarrowedOption: DeprecatedNarrowedReferenceBuilder<T1, T2>;
  }
>;
