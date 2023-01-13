import { UnknownTargetPath } from '../types/targetPath';
import {
  StaticTargetReferenceConfiguration,
  UnknownStaticTargetReferenceConfiguration,
} from '../types/targetReferenceConfiguration/staticTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTypedTarget } from '../types/typedTarget';

export const buildStaticTargetReferenceConfiguration = <
  TInputTargetReference extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetReference extends UnknownTargetPath,
>({
  inputTargetPath,
  outputTargetReference,
}: Omit<
  StaticTargetReferenceConfiguration<
    TInputTargetReference,
    TOutputTypedTarget,
    TOutputTargetReference
  >,
  'typeId'
>): UnknownStaticTargetReferenceConfiguration => ({
  typeId: TargetReferenceConfigurationTypeId.StaticTargetReferenceConfiguration,
  inputTargetPath,
  outputTargetReference,
});
