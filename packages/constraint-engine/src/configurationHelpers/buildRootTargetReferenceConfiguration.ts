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
  TInputInstance extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
>({
  inputInstance,
  inputTargetPath,
  outputTargetTypeId,
  outputTargetPath,
  buildReference,
}: Omit<
  KnownRootTargetReferenceConfiguration<
    TInputInstance,
    TOutputTypedTarget,
    TOutputTargetPath
  >,
  'typeId'
>): PartiallyKnownRootTargetReferenceConfiguration<
  TInputInstance,
  TOutputTypedTarget,
  TOutputTargetPath
> => ({
  typeId: TargetReferenceConfigurationTypeId.RootTargetReferenceConfiguration,
  inputInstance,
  inputTargetPath,
  outputTargetTypeId,
  outputTargetPath,
  buildReference: buildReference as PartiallyKnownReferenceBuilder<
    TOutputTypedTarget,
    TOutputTargetPath
  >,
});
