import { DeprecatedDerivedReferenceSetBuilder } from '../builders/deprecatedDerivedReferenceSetBuilder';
import { UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

/** @deprecated */
type BaseDeprecatedDerivedTargetReferenceSetConfiguration<
  TEngineInputTypedTarget extends UnknownTypedTarget,
  TEngineInputTargetPath extends UnknownTargetPath,
  TConfigurationInputTypedTarget extends UnknownTypedTarget,
  TConfigurationInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceSetConfiguration;
  buildReferenceSet: DeprecatedDerivedReferenceSetBuilder<
    TEngineInputTypedTarget,
    TEngineInputTargetPath,
    TOutputTypedTarget,
    TOutputTargetPath
  >;
  inputTargetTypeId: TConfigurationInputTypedTarget['typeId'];
  inputTargetPath: TConfigurationInputTargetPath;
};

/** @deprecated */
export type DeprecatedDerivedTargetReferenceSetConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = BaseDeprecatedDerivedTargetReferenceSetConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
>;

/** @deprecated */
export type DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = BaseDeprecatedDerivedTargetReferenceSetConfiguration<
  UnknownTypedTarget,
  UnknownTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTarget,
  TOutputTargetPath
>;

/** @deprecated */
export type UnknownDeprecatedDerivedTargetReferenceSetConfiguration =
  DeprecatedDerivedTargetReferenceSetConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath
  >;
