import { buildDeprecatedNarrowedReferenceBuilder } from '../referenceBuilders/buildDeprecatedNarrowedReferenceBuilder';
import { NormalizedDeprecatedDerivedReferenceBuilder } from '../types/builders/deprecatedDerivedReferenceBuilder';
import {
  DeprecatedNarrowedReferenceBuilderConstrainedOutput,
  DeprecatedNarrowedReferenceBuilderInput,
  EvaluateGuardRuleTuple,
} from '../types/builders/deprecatedNarrowedReferenceBuilder';
import {
  DeprecatedDerivedTargetReferenceConfiguration,
  DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder,
} from '../types/targetReferenceConfiguration/deprecatedDerivedTargetReferenceConfiguration';
import { TypedTarget } from '../types/typedTarget';
import { buildDeprecatedDerivedTargetReferenceConfiguration } from './buildDeprecatedDerivedTargetReferenceConfiguration';

/** @deprecated */
export type DeprecatedNarrowedTargetReferenceConfigurationBuilderInput<
  T1 extends DeprecatedNarrowedReferenceBuilderInput,
  T2 extends DeprecatedNarrowedReferenceBuilderConstrainedOutput<T1>,
> = Pick<
  DeprecatedDerivedTargetReferenceConfiguration<{
    InputTypedTarget: T1['InputTypedTarget'];
    InputTargetPath: T1['InputTargetPath'];
    OutputTypedTargetOptionsTuple: [
      TypedTarget<T2['OutputTargetTypeId'], T2['OutputTargetInstance']>,
    ];
    OutputTargetPathTuple: [T1['InputTargetPath']];
  }>,
  'inputTargetTypeId' | 'conditions'
> & {
  inputTargetPath: T1['InputTargetPath'];
  conditions: T2['GuardRuleTuple'];
  outputTargetTypeId: EvaluateGuardRuleTuple<
    T1,
    T2,
    {
      IdentityOption: T1['InputTypedTarget']['typeId'];
      NarrowedOption: T2['OutputTargetTypeId'];
    }
  >;
};

/** @deprecated */
export const buildDeprecatedNarrowedTargetReferenceConfiguration = <
  T1 extends DeprecatedNarrowedReferenceBuilderInput,
  T2 extends DeprecatedNarrowedReferenceBuilderConstrainedOutput<T1>,
>({
  inputTargetTypeId,
  inputTargetPath,
  outputTargetTypeId,
  conditions,
}: DeprecatedNarrowedTargetReferenceConfigurationBuilderInput<
  T1,
  T2
>): DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder<{
  InputTypedTarget: T1['InputTypedTarget'];
  InputTargetPath: T1['InputTargetPath'];
  OutputTypedTargetOptionsTuple: [
    EvaluateGuardRuleTuple<
      T1,
      T2,
      {
        IdentityOption: T1['InputTypedTarget'];
        NarrowedOption: TypedTarget<
          T2['OutputTargetTypeId'],
          T2['OutputTargetInstance']
        >;
      }
    >,
  ];
  OutputTargetPathTuple: [T1['InputTargetPath']];
}> =>
  buildDeprecatedDerivedTargetReferenceConfiguration<{
    InputTypedTarget: T1['InputTypedTarget'];
    InputTargetPath: T1['InputTargetPath'];
    OutputTypedTargetOptionsTuple: [
      EvaluateGuardRuleTuple<
        T1,
        T2,
        {
          IdentityOption: T1['InputTypedTarget'];
          NarrowedOption: TypedTarget<
            T2['OutputTargetTypeId'],
            T2['OutputTargetInstance']
          >;
        }
      >,
    ];
    OutputTargetPathTuple: [T1['InputTargetPath']];
  }>({
    inputTargetTypeId,
    inputTargetPath,
    buildReference: buildDeprecatedNarrowedReferenceBuilder<T1, T2>(
      conditions,
      outputTargetTypeId,
    ) as NormalizedDeprecatedDerivedReferenceBuilder<{
      OutputTypedTargetOptionsTuple: [
        EvaluateGuardRuleTuple<
          T1,
          T2,
          {
            IdentityOption: T1['InputTypedTarget'];
            NarrowedOption: TypedTarget<
              T2['OutputTargetTypeId'],
              T2['OutputTargetInstance']
            >;
          }
        >,
      ];
      OutputTargetPathTuple: [T1['InputTargetPath']];
    }>,
    conditions,
  });
