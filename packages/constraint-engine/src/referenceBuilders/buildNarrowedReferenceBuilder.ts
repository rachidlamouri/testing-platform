import {
  CastReferenceBuilder,
  EvaluateGuardRuleTuple,
} from '../types/builders/narrowedReferenceBuilder';
import { InferableGuardRule } from '../types/rule';
import { UnknownTargetPath } from '../types/targetPath';
import {
  TargetReference,
  TargetReferenceTuple,
} from '../types/targetReference';
import {
  TypedTarget,
  UnknownTargetTypeId,
  UnknownTypedTarget,
} from '../types/typedTarget';

const evaluateInputTargetReference = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TGuardRuleTuple extends readonly InferableGuardRule<
    TInputTypedTarget['instance']
  >[],
  TOutputTargetInstance extends TInputTypedTarget['instance'],
  TNarrowedOption,
  TIdentityOption,
>(
  inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
  conditions: TGuardRuleTuple,
  narrowedOutput: TNarrowedOption,
  identityOutput: TIdentityOption,
): EvaluateGuardRuleTuple<
  TInputTypedTarget,
  TGuardRuleTuple,
  TOutputTargetInstance,
  TNarrowedOption,
  TIdentityOption
> => {
  return (
    conditions.every((condition) => condition(inputReference.instance))
      ? narrowedOutput
      : identityOutput
  ) as EvaluateGuardRuleTuple<
    TInputTypedTarget,
    TGuardRuleTuple,
    TOutputTargetInstance,
    TNarrowedOption,
    TIdentityOption
  >;
};

export const buildNarrowedReferenceBuilder = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TGuardRuleTuple extends readonly InferableGuardRule<
    TInputTypedTarget['instance']
  >[],
  TOutputTargetTypeId extends UnknownTargetTypeId,
  TOutputTargetInstance extends TInputTypedTarget['instance'],
>(
  conditions: TGuardRuleTuple,
  outputTargetTypeId: EvaluateGuardRuleTuple<
    TInputTypedTarget,
    TGuardRuleTuple,
    TOutputTargetInstance,
    TOutputTargetTypeId,
    TInputTypedTarget['typeId']
  >,
): CastReferenceBuilder<
  TInputTypedTarget,
  TInputTargetPath,
  TGuardRuleTuple,
  TOutputTargetTypeId,
  TOutputTargetInstance
> => {
  type TOutputTypedTarget = TypedTarget<
    TOutputTargetTypeId,
    TOutputTargetInstance
  >;

  const buildNarrowedReference = (
    inputReference: TargetReference<TInputTypedTarget, TInputTargetPath>,
  ): TargetReferenceTuple<
    TOutputTypedTarget | TInputTypedTarget,
    [TInputTargetPath]
  > => {
    const outputReference: EvaluateGuardRuleTuple<
      TInputTypedTarget,
      TGuardRuleTuple,
      TOutputTargetInstance,
      TargetReference<TOutputTypedTarget, TInputTargetPath>,
      TargetReference<TInputTypedTarget, TInputTargetPath>
    > = evaluateInputTargetReference<
      TInputTypedTarget,
      TInputTargetPath,
      TGuardRuleTuple,
      TOutputTargetInstance,
      TargetReference<TOutputTypedTarget, TInputTargetPath>,
      TargetReference<TInputTypedTarget, TInputTargetPath>
    >(
      inputReference,
      conditions,
      {
        typeId: outputTargetTypeId as TOutputTargetTypeId,
        instance: inputReference.instance as TOutputTargetInstance,
        path: inputReference.path,
      },
      inputReference,
    );

    return [outputReference];
  };

  return buildNarrowedReference as CastReferenceBuilder<
    TInputTypedTarget,
    TInputTargetPath,
    TGuardRuleTuple,
    TOutputTargetTypeId,
    TOutputTargetInstance
  >;
};
