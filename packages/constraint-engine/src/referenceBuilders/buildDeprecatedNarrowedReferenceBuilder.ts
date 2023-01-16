import {
  CastReferenceBuilder,
  EvaluateGuardRuleTuple,
  EvaluationResultOptions,
  DeprecatedNarrowedReferenceBuilderInput,
  DeprecatedNarrowedReferenceBuilderConstrainedOutput,
} from '../types/builders/deprecatedNarrowedReferenceBuilder';
import {
  TargetReference,
  TargetReferenceTuple,
} from '../types/targetReference';
import { TypedTarget } from '../types/typedTarget';

const evaluateInputTargetReference = <
  T1 extends DeprecatedNarrowedReferenceBuilderInput,
  T2 extends DeprecatedNarrowedReferenceBuilderConstrainedOutput<T1>,
  T3 extends EvaluationResultOptions,
>(
  inputReference: TargetReference<
    T1['InputTypedTarget'],
    T1['InputTargetPath']
  >,
  conditions: T2['GuardRuleTuple'],
  narrowedOutput: T3['NarrowedOption'],
  identityOutput: T3['IdentityOption'],
): EvaluateGuardRuleTuple<T1, T2, T3> => {
  return (
    conditions.every((condition) => condition(inputReference.instance))
      ? narrowedOutput
      : identityOutput
  ) as EvaluateGuardRuleTuple<T1, T2, T3>;
};

/** @deprecated */
export const buildDeprecatedNarrowedReferenceBuilder = <
  T1 extends DeprecatedNarrowedReferenceBuilderInput,
  T2 extends DeprecatedNarrowedReferenceBuilderConstrainedOutput<T1>,
>(
  conditions: T2['GuardRuleTuple'],
  outputTargetTypeId: EvaluateGuardRuleTuple<
    T1,
    T2,
    {
      IdentityOption: T1['InputTypedTarget']['typeId'];
      NarrowedOption: T2['OutputTargetTypeId'];
    }
  >,
): CastReferenceBuilder<T1, T2> => {
  type T4 = {
    OutputTypedTarget: TypedTarget<
      T2['OutputTargetTypeId'],
      T2['OutputTargetInstance']
    >;
  };

  /** @deprecated */
  const buildDeprecatedNarrowedReference = (
    inputReference: TargetReference<
      T1['InputTypedTarget'],
      T1['InputTargetPath']
    >,
  ): TargetReferenceTuple<
    T4['OutputTypedTarget'] | T1['InputTypedTarget'],
    [T1['InputTargetPath']]
  > => {
    const outputReference: EvaluateGuardRuleTuple<
      T1,
      T2,
      {
        IdentityOption: TargetReference<
          T1['InputTypedTarget'],
          T1['InputTargetPath']
        >;
        NarrowedOption: TargetReference<
          T4['OutputTypedTarget'],
          T1['InputTargetPath']
        >;
      }
    > = evaluateInputTargetReference<
      T1,
      T2,
      {
        IdentityOption: TargetReference<
          T1['InputTypedTarget'],
          T1['InputTargetPath']
        >;
        NarrowedOption: TargetReference<
          T4['OutputTypedTarget'],
          T1['InputTargetPath']
        >;
      }
    >(
      inputReference,
      conditions,
      {
        typeId: outputTargetTypeId as T2['OutputTargetTypeId'],
        instance: inputReference.instance as T2['OutputTargetInstance'],
        path: inputReference.path,
      },
      inputReference,
    );

    return [outputReference];
  };

  return buildDeprecatedNarrowedReference as CastReferenceBuilder<T1, T2>;
};
