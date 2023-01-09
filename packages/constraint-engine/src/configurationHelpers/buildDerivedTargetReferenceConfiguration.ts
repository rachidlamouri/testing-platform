import { PartiallyKnownDerivedReferenceBuilder } from '../types/builders/derivedReferenceBuilder';
import { UnknownTargetPath, UnknownTargetPathTuple } from '../types/targetPath';
import {
  KnownDerivedTargetReferenceConfiguration,
  PartiallyKnownDerivedTargetReferenceConfiguration,
} from '../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTypedTarget } from '../types/typedTarget';

type PartialKeys<TObject, TKey extends keyof TObject> = Omit<TObject, TKey> &
  Partial<Pick<TObject, TKey>>;

export const buildDerivedTargetReferenceConfiguration = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
>({
  inputTargetTypeId,
  inputTargetPath,
  outputTargetTypeId,
  outputTargetPath,
  buildReference,
  conditions = [],
}: PartialKeys<
  Omit<
    KnownDerivedTargetReferenceConfiguration<
      TInputTypedTarget,
      TInputTargetPath,
      TOutputTypedTargetOptionsTuple,
      TOutputTargetPathTuple
    >,
    'typeId'
  >,
  'conditions'
>): PartiallyKnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
  inputTargetTypeId,
  inputTargetPath,
  outputTargetTypeId,
  outputTargetPath,
  buildReference: buildReference as PartiallyKnownDerivedReferenceBuilder<
    TOutputTypedTargetOptionsTuple,
    TOutputTargetPathTuple
  >,
  conditions,
});
