import { PartiallyKnownDerivedReferenceBuilder } from '../types/builders/derivedReferenceBuilder';
import { UnknownTargetPath } from '../types/targetPath';
import {
  KnownDerivedTargetReferenceConfiguration,
  PartiallyKnownDerivedTargetReferenceConfiguration,
} from '../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTypedTarget } from '../types/typedTarget';

export const buildDerivedTargetReferenceConfiguration = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
>({
  inputTargetTypeId,
  normalizedInputTargetPath,
  outputTargetTypeId,
  normalizedOutputTargetPath,
  buildReference,
}: Omit<
  KnownDerivedTargetReferenceConfiguration<
    TInputTypedTarget,
    TInputTargetPath,
    TOutputTypedTarget,
    TOutputTargetPath
  >,
  'typeId'
>): PartiallyKnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
  inputTargetTypeId,
  normalizedInputTargetPath,
  outputTargetTypeId,
  normalizedOutputTargetPath,
  buildReference: buildReference as PartiallyKnownDerivedReferenceBuilder<
    TOutputTypedTarget,
    TOutputTargetPath
  >,
});
