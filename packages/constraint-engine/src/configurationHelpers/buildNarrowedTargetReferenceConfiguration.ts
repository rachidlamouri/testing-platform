import { buildNarrowedReferenceBuilder } from '../referenceBuilders/buildNarrowedReferenceBuilder';
import { GuardRuleTupleNarrowedTargetIntersection } from '../types/builders/narrowedReferenceBuilder';
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
  TGuardRuleTuple extends readonly InferableGuardRule[],
  TOutputTypedTarget extends TypedTarget<
    UnknownTargetTypeId,
    GuardRuleTupleNarrowedTargetIntersection<TGuardRuleTuple>
  >,
> = Pick<
  KnownDerivedTargetReferenceConfiguration<
    TInputTypedTarget,
    TInputTargetPath,
    [TOutputTypedTarget],
    TInputTargetPath
  >,
  'inputTargetTypeId' | 'conditions'
> & {
  inputTargetPath: TInputTargetPath;
  conditions: TGuardRuleTuple;
  outputTargetTypeId: TOutputTypedTarget['typeId'];
};

export const buildNarrowedTargetReferenceConfiguration = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TGuardRuleTuple extends readonly InferableGuardRule[],
  TOutputTypedTarget extends TypedTarget<
    UnknownTargetTypeId,
    GuardRuleTupleNarrowedTargetIntersection<TGuardRuleTuple>
  >,
>({
  inputTargetTypeId,
  inputTargetPath,
  outputTargetTypeId,
  conditions,
}: NarrowedTargetReferenceConfigurationBuilderInput<
  TInputTypedTarget,
  TInputTargetPath,
  TGuardRuleTuple,
  TOutputTypedTarget
>): PartiallyKnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  [TOutputTypedTarget],
  TInputTargetPath
> =>
  buildDerivedTargetReferenceConfiguration<
    TInputTypedTarget,
    TInputTargetPath,
    [TOutputTypedTarget],
    TInputTargetPath
  >({
    inputTargetTypeId,
    inputTargetPath,
    outputTargetTypeId: [outputTargetTypeId],
    outputTargetPath: inputTargetPath,
    buildReference: buildNarrowedReferenceBuilder<
      TInputTypedTarget,
      TInputTargetPath,
      TGuardRuleTuple,
      TOutputTypedTarget
    >(outputTargetTypeId),
    conditions,
  });
