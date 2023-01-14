import { buildNarrowedReferenceBuilder } from '../referenceBuilders/buildNarrowedReferenceBuilder';
import { NormalizedDerivedReferenceBuilder } from '../types/builders/deprecatedDerivedReferenceBuilder';
import { EvaluateGuardRuleTuple } from '../types/builders/narrowedReferenceBuilder';
import { InferableGuardRule } from '../types/rule';
import { UnknownTargetPath } from '../types/targetPath';
import {
  DerivedTargetReferenceConfiguration,
  DerivedTargetReferenceConfigurationWithNormalizedBuilder,
} from '../types/targetReferenceConfiguration/deprecatedDerivedTargetReferenceConfiguration';
import {
  TypedTarget,
  UnknownTargetTypeId,
  UnknownTypedTarget,
} from '../types/typedTarget';
import { buildDerivedTargetReferenceConfiguration } from './buildDeprecatedDerivedTargetReferenceConfiguration';

export type NarrowedTargetReferenceConfigurationBuilderInput<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TGuardRuleTuple extends readonly InferableGuardRule<
    TInputTypedTarget['instance']
  >[],
  TOutputTargetTypeId extends UnknownTargetTypeId,
  TOutputTargetInstance extends TInputTypedTarget['instance'],
> = Pick<
  DerivedTargetReferenceConfiguration<
    TInputTypedTarget,
    TInputTargetPath,
    [TypedTarget<TOutputTargetTypeId, TOutputTargetInstance>],
    [TInputTargetPath]
  >,
  'inputTargetTypeId' | 'conditions'
> & {
  inputTargetPath: TInputTargetPath;
  conditions: TGuardRuleTuple;
  outputTargetTypeId: EvaluateGuardRuleTuple<
    TInputTypedTarget,
    TGuardRuleTuple,
    TOutputTargetInstance,
    TOutputTargetTypeId,
    TInputTypedTarget['typeId']
  >;
};

export const buildNarrowedTargetReferenceConfiguration = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TGuardRuleTuple extends readonly InferableGuardRule<
    TInputTypedTarget['instance']
  >[],
  TOutputTargetTypeId extends UnknownTargetTypeId,
  TOutputTargetInstance extends TInputTypedTarget['instance'],
>({
  inputTargetTypeId,
  inputTargetPath,
  outputTargetTypeId,
  conditions,
}: NarrowedTargetReferenceConfigurationBuilderInput<
  TInputTypedTarget,
  TInputTargetPath,
  TGuardRuleTuple,
  TOutputTargetTypeId,
  TOutputTargetInstance
>): DerivedTargetReferenceConfigurationWithNormalizedBuilder<
  TInputTypedTarget,
  TInputTargetPath,
  [
    EvaluateGuardRuleTuple<
      TInputTypedTarget,
      TGuardRuleTuple,
      TOutputTargetInstance,
      TypedTarget<TOutputTargetTypeId, TOutputTargetInstance>,
      TInputTypedTarget
    >,
  ],
  [TInputTargetPath]
> =>
  buildDerivedTargetReferenceConfiguration<
    TInputTypedTarget,
    TInputTargetPath,
    [
      EvaluateGuardRuleTuple<
        TInputTypedTarget,
        TGuardRuleTuple,
        TOutputTargetInstance,
        TypedTarget<TOutputTargetTypeId, TOutputTargetInstance>,
        TInputTypedTarget
      >,
    ],
    [TInputTargetPath]
  >({
    inputTargetTypeId,
    inputTargetPath,
    outputTargetTypeId: [outputTargetTypeId],
    outputTargetPaths: [inputTargetPath],
    buildReference: buildNarrowedReferenceBuilder<
      TInputTypedTarget,
      TInputTargetPath,
      TGuardRuleTuple,
      TOutputTargetTypeId,
      TOutputTargetInstance
    >(conditions, outputTargetTypeId) as NormalizedDerivedReferenceBuilder<
      [
        EvaluateGuardRuleTuple<
          TInputTypedTarget,
          TGuardRuleTuple,
          TOutputTargetInstance,
          TypedTarget<TOutputTargetTypeId, TOutputTargetInstance>,
          TInputTypedTarget
        >,
      ],
      [TInputTargetPath]
    >,
    conditions,
  });
