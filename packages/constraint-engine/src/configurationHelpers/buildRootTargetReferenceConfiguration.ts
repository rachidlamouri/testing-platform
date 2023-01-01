import { PartiallyKnownReferenceBuilder } from '../types/builders/referenceBuilder';
import { UnknownTargetInstance } from '../types/targetInstance';
import { UnknownTargetPath } from '../types/targetPath';
import {
  KnownRootTargetReferenceConfiguration,
  PartiallyKnownRootTargetReferenceConfiguration,
} from '../types/targetReferenceConfiguration/rootTargetReferenceConfiguration';
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
  KnownRootTargetReferenceConfiguration<
    TInputData,
    TOutputTypedTarget,
    TOutputTargetPath
  >,
  'typeId'
>): PartiallyKnownRootTargetReferenceConfiguration<
  TInputData,
  TOutputTypedTarget,
  TOutputTargetPath
> => ({
  typeId: TargetReferenceConfigurationTypeId.RootTargetReferenceConfiguration,
  inputData,
  normalizedInputTargetPath,
  outputTargetTypeId,
  normalizedOutputTargetPath,
  buildReference: buildReference as PartiallyKnownReferenceBuilder<
    TOutputTypedTarget,
    TOutputTargetPath
  >,
});
