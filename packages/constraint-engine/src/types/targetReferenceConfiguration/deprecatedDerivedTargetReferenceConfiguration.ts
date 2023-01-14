import { DeprecatedDerivedReferenceBuilder } from '../builders/deprecatedDerivedReferenceBuilder';
import { Rule } from '../rule';
import { UnknownTargetPath, UnknownTargetPathTuple } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

/** @deprecated */
type BaseDeprecatedDerivedTargetReferenceConfiguration<
  TActualInputTypedTarget extends UnknownTypedTarget,
  TActualInputTargetPath extends UnknownTargetPath,
  TExpectedInputTypedTarget extends UnknownTypedTarget,
  TExpectedInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = {
  typeId: TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceConfiguration;
  buildReference: DeprecatedDerivedReferenceBuilder<
    TActualInputTypedTarget,
    TActualInputTargetPath,
    TOutputTypedTargetOptionsTuple,
    TOutputTargetPathTuple
  >;
  inputTargetTypeId: TExpectedInputTypedTarget['typeId'];
  inputTargetPath: TExpectedInputTargetPath;
  outputTargetTypeId: {
    [Index in keyof TOutputTypedTargetOptionsTuple]: TOutputTypedTargetOptionsTuple[Index]['typeId'];
  };
  outputTargetPaths: TOutputTargetPathTuple;
  conditions: Rule<TActualInputTypedTarget['instance']>[];
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
  BaseDeprecatedDerivedTargetReferenceConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath,
    [UnknownTypedTarget],
    UnknownTargetPathTuple
  >;
