import { DeprecatedDerivedReferenceBuilder } from '../builders/deprecatedDerivedReferenceBuilder';
import { Rule } from '../rule';
import { UnknownTargetPath, UnknownTargetPathTuple } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

/** @deprecated */
type BaseDeprecatedDerivedTargetReferenceConfiguration<
  TEngineInputTypedTarget extends UnknownTypedTarget,
  TEngineInputTargetPath extends UnknownTargetPath,
  TConfigurationInputTypedTarget extends UnknownTypedTarget,
  TConfigurationInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = {
  typeId: TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceConfiguration;
  buildReference: DeprecatedDerivedReferenceBuilder<
    TEngineInputTypedTarget,
    TEngineInputTargetPath,
    TOutputTypedTargetOptionsTuple,
    TOutputTargetPathTuple
  >;
  inputTargetTypeId: TConfigurationInputTypedTarget['typeId'];
  inputTargetPath: TConfigurationInputTargetPath;
  conditions: Rule<TEngineInputTypedTarget['instance']>[];
};

/** @deprecated */
export type DeprecatedDerivedTargetReferenceConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = BaseDeprecatedDerivedTargetReferenceConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
>;

/** @deprecated */
export type DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = BaseDeprecatedDerivedTargetReferenceConfiguration<
  UnknownTypedTarget,
  UnknownTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
>;

/** @deprecated */
export type UnknownDeprecatedDerivedTargetReferenceConfiguration =
  DeprecatedDerivedTargetReferenceConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    [UnknownTypedTarget],
    UnknownTargetPathTuple
  >;
