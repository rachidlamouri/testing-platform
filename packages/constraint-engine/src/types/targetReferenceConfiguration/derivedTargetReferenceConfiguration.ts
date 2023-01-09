import { KnownDerivedReferenceBuilder } from '../builders/derivedReferenceBuilder';
import { Rule } from '../rule';
import { UnknownTargetPath } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

type DerivedTargetReferenceConfiguration<
  TActualInputTypedTarget extends UnknownTypedTarget,
  TActualInputTargetPath extends UnknownTargetPath,
  TExpectedInputTypedTarget extends UnknownTypedTarget,
  TExpectedInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = {
  typeId: TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration;
  buildReference: KnownDerivedReferenceBuilder<
    TActualInputTypedTarget,
    TActualInputTargetPath,
    TOutputTypedTargetOptionsTuple,
    TOutputTargetPath
  >;
  inputTargetTypeId: TExpectedInputTypedTarget['typeId'];
  inputTargetPath: TExpectedInputTargetPath;
  outputTargetTypeId: {
    [Index in keyof TOutputTypedTargetOptionsTuple]: TOutputTypedTargetOptionsTuple[Index]['typeId'];
  };
  outputTargetPath: TOutputTargetPath;
  conditions: Rule<TActualInputTypedTarget['instance']>[];
};

export type KnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = DerivedTargetReferenceConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPath
>;

export type PartiallyKnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPath extends UnknownTargetPath,
> = DerivedTargetReferenceConfiguration<
  UnknownTypedTarget,
  UnknownTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPath
>;

export type UnknownDerivedTargetReferenceConfiguration =
  DerivedTargetReferenceConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath,
    [UnknownTypedTarget],
    UnknownTargetPath
  >;
