import { PartiallyKnownDerivedReferenceBuilder } from '../types/builders/derivedReferenceBuilder';
import { UnknownTargetPath } from '../types/targetPath';
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
  TOutputTypedTargetOptions extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
>({
  inputTargetTypeId,
  normalizedInputTargetPath,
  outputTargetTypeId,
  normalizedOutputTargetPath,
  buildReference,
  conditions = [],
}: PartialKeys<
  Omit<
    KnownDerivedTargetReferenceConfiguration<
      TInputTypedTarget,
      TInputTargetPath,
      TOutputTypedTargetOptions,
      TOutputTargetPath
    >,
    'typeId'
  >,
  'conditions'
>): PartiallyKnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptions,
  TOutputTargetPath
> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
  inputTargetTypeId,
  normalizedInputTargetPath,
  outputTargetTypeId,
  normalizedOutputTargetPath,
  buildReference: buildReference as PartiallyKnownDerivedReferenceBuilder<
    TOutputTypedTargetOptions,
    TOutputTargetPath
  >,
  conditions,
});
