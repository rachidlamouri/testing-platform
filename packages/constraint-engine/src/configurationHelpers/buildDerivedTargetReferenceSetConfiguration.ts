import { PartiallyKnownDerivedReferenceSetBuilder } from '../types/builders/derivedReferenceSetBuilder';
import { UnknownTargetPath } from '../types/targetPath';
import {
  DerivedTargetReferenceSetConfiguration,
  DerivedTargetReferenceSetConfigurationWithNormalizedBuilder,
} from '../types/targetReferenceConfiguration/derivedTargetReferenceSetConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTypedTarget } from '../types/typedTarget';

export const buildDerivedTargetReferenceSetConfiguration = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
>({
  inputTargetTypeId,
  inputTargetPath,
  outputTargetTypeId,
  outputTargetPath,
  buildReferenceSet,
}: Omit<
  DerivedTargetReferenceSetConfiguration<
    TInputTypedTarget,
    TInputTargetPath,
    TOutputTypedTarget,
    TOutputTargetPath
  >,
  'typeId'
>): DerivedTargetReferenceSetConfigurationWithNormalizedBuilder<
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DerivedTargetReferenceSetConfiguration,
  inputTargetTypeId,
  inputTargetPath,
  outputTargetTypeId,
  outputTargetPath,
  buildReferenceSet:
    buildReferenceSet as PartiallyKnownDerivedReferenceSetBuilder<
      TOutputTypedTarget,
      TOutputTargetPath
    >,
});
