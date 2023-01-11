import { UnknownTargetPath } from '../targetPath';
import { TargetReference } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

export type KnownStaticTargetReferenceConfiguration<
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.StaticTargetReferenceConfiguration;
  inputTargetPath: TInputTargetPath;
  outputTargetReference: TargetReference<TOutputTypedTarget, TOutputTargetPath>;
};

export type UnknownStaticTargetReferenceConfiguration =
  KnownStaticTargetReferenceConfiguration<
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath
  >;
