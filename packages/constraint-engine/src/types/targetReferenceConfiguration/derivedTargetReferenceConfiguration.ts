import { KnownDerivedReferenceBuilder } from '../builders/derivedReferenceBuilder';
import { Rule } from '../rule';
import { UnknownTargetPath, UnknownTargetPathTuple } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

type BaseDerivedTargetReferenceConfiguration<
  TActualInputTypedTarget extends UnknownTypedTarget,
  TActualInputTargetPath extends UnknownTargetPath,
  TExpectedInputTypedTarget extends UnknownTypedTarget,
  TExpectedInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = {
  typeId: TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration;
  buildReference: KnownDerivedReferenceBuilder<
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

export type DerivedTargetReferenceConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = BaseDerivedTargetReferenceConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
>;

export type DerivedTargetReferenceConfigurationWithNormalizedBuilder<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = BaseDerivedTargetReferenceConfiguration<
  UnknownTypedTarget,
  UnknownTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
>;

export type UnknownDerivedTargetReferenceConfiguration =
  BaseDerivedTargetReferenceConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath,
    [UnknownTypedTarget],
    UnknownTargetPathTuple
  >;
