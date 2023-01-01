import { ReferenceBuilder } from '../builders/referenceBuilder';
import { UnknownTargetInstance } from '../targetInstance';
import {
  NormalizedTargetPath,
  RootTargetPath,
  UnknownTargetPath,
} from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

export type RootTargetReferenceConfiguration<
  TInputData extends UnknownTargetInstance,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.RootTargetReferenceConfiguration;
  buildReference: ReferenceBuilder<
    TInputData,
    TOutputTypedTarget,
    TOutputTargetPath
  >;
  inputData: TInputData;
  normalizedInputTargetPath: RootTargetPath;
  outputTargetTypeId: TOutputTypedTarget['typeId'];
  normalizedOutputTargetPath: NormalizedTargetPath<TOutputTargetPath>;
};

export type UnknownRootTargetReferenceConfiguration =
  RootTargetReferenceConfiguration<
    UnknownTargetInstance,
    UnknownTypedTarget,
    UnknownTargetPath
  >;
