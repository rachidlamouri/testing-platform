import { DeprecatedDerivedReferenceSetBuilder } from '../builders/deprecatedDerivedReferenceSetBuilder';
import { UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

/** @deprecated */
type BaseDeprecatedDerivedTargetReferenceSetConfiguration<
  TActualInputTypedTarget extends UnknownTypedTarget,
  TActualInputTargetPath extends UnknownTargetPath,
  TExpectedInputTypedTarget extends UnknownTypedTarget,
  TExpectedInputTargetPath extends UnknownTargetPath,
  TOutputTypedTarget extends UnknownTypedTarget,
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceSetConfiguration;
  buildReferenceSet: DeprecatedDerivedReferenceSetBuilder<
    TActualInputTypedTarget,
    TActualInputTargetPath,
    TOutputTypedTarget,
    TOutputTargetPath
  >;
  inputTargetTypeId: TExpectedInputTypedTarget['typeId'];
  inputTargetPath: TExpectedInputTargetPath;
  outputTargetTypeId: TOutputTypedTarget['typeId'];
  outputTargetPath: TOutputTargetPath;
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
  BaseDeprecatedDerivedTargetReferenceSetConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath
  >;
