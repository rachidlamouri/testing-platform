import { buildNarrowedReferenceBuilder } from '../referenceBuilders/buildNarrowedReferenceBuilder';
import { PartiallyKnownDerivedReferenceBuilder } from '../types/builders/derivedReferenceBuilder';
import { EvaluateGuardRuleTuple } from '../types/builders/narrowedReferenceBuilder';
import { InferableGuardRule } from '../types/rule';
import { UnknownTargetPath } from '../types/targetPath';
import {
  KnownDerivedTargetReferenceConfiguration,
  PartiallyKnownDerivedTargetReferenceConfiguration,
} from '../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import {
  TypedTarget,
  UnknownTargetTypeId,
  UnknownTypedTarget,
} from '../types/typedTarget';
import { buildDerivedTargetReferenceConfiguration } from './buildDerivedTargetReferenceConfiguration';

export type NarrowedTargetReferenceConfigurationBuilderInput<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TGuardRuleTuple extends readonly InferableGuardRule<
    TInputTypedTarget['instance']
  >[],
  TOutputTargetTypeId extends UnknownTargetTypeId,
  TOutputTargetInstance extends TInputTypedTarget['instance'],
> = Pick<
  KnownDerivedTargetReferenceConfiguration<
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
>): PartiallyKnownDerivedTargetReferenceConfiguration<
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
    outputTargetPath: [inputTargetPath],
    buildReference: buildNarrowedReferenceBuilder<
      TInputTypedTarget,
      TInputTargetPath,
      TGuardRuleTuple,
      TOutputTargetTypeId,
      TOutputTargetInstance
    >(conditions, outputTargetTypeId) as PartiallyKnownDerivedReferenceBuilder<
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
