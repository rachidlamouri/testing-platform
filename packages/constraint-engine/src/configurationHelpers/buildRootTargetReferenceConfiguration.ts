import { UnknownTargetInstance } from '../types/targetInstance';
import { UnknownTargetPath } from '../types/targetPath';
import { RootTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/rootTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTypedTarget } from '../types/typedTarget';

export const buildRootTargetReferenceConfiguration = <
  TInputData extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
>({
  inputData,
  normalizedInputTargetPath,
  outputTargetTypeId,
  normalizedOutputTargetPath,
  buildReference,
}: Omit<
  RootTargetReferenceConfiguration<
    TInputData,
    TOutputTypedTarget,
    TOutputTargetPath
  >,
  'typeId'
>): RootTargetReferenceConfiguration<
  TInputData,
  TOutputTypedTarget,
  TOutputTargetPath
> => ({
  typeId: TargetReferenceConfigurationTypeId.RootTargetReferenceConfiguration,
  inputData,
  normalizedInputTargetPath,
  outputTargetTypeId,
  normalizedOutputTargetPath,
  buildReference,
});
