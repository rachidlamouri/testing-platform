import { NormalizedDeprecatedDerivedReferenceSetBuilder } from '../types/builders/deprecatedDerivedReferenceSetBuilder';
import { UnknownTargetPath } from '../types/targetPath';
import {
  DeprecatedDerivedTargetReferenceSetConfiguration,
  DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedBuilder,
} from '../types/targetReferenceConfiguration/deprecatedDerivedTargetReferenceSetConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTypedTarget } from '../types/typedTarget';

/** @deprecated */
export const buildDerivedTargetReferenceSetConfiguration = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
>({
  inputTargetTypeId,
  inputTargetPath,
  buildReferenceSet,
}: Omit<
  DeprecatedDerivedTargetReferenceSetConfiguration<
    TInputTypedTarget,
    TInputTargetPath,
    TOutputTypedTarget,
    TOutputTargetPath
  >,
  'typeId'
>): DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedBuilder<
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceSetConfiguration,
  inputTargetTypeId,
  inputTargetPath,
  buildReferenceSet:
    buildReferenceSet as NormalizedDeprecatedDerivedReferenceSetBuilder<
      TOutputTypedTarget,
      TOutputTargetPath
    >,
});