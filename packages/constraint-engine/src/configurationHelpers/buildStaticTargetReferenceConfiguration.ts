import { UnknownTargetPath } from '../types/targetPath';
import {
  StaticTargetReferenceConfiguration,
  UnknownStaticTargetReferenceConfiguration,
} from '../types/targetReferenceConfiguration/staticTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTypedTarget } from '../types/typedTarget';

export const buildStaticTargetReferenceConfiguration = <
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
>({
  inputTargetPath,
  outputTargetReference,
}: Omit<
  StaticTargetReferenceConfiguration<
    TInputTargetPath,
    TOutputTypedTarget,
    TOutputTargetPath
  >,
  'typeId'
>): UnknownStaticTargetReferenceConfiguration => ({
  typeId: TargetReferenceConfigurationTypeId.StaticTargetReferenceConfiguration,
  inputTargetPath,
  outputTargetReference,
});
