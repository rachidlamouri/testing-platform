import { KnownDerivedReferenceBuilder } from '../builders/derivedReferenceBuilder';
import { Rule } from '../rule';
import { UnknownTargetPath, UnknownTargetPathTuple } from '../targetPath';
import { UnknownTypedTarget } from '../typedTarget';
import { TargetReferenceConfigurationTypeId } from './typeId';

type DerivedTargetReferenceConfiguration<
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
  // TODO: make this plural "outputTargetPaths"
  outputTargetPath: TOutputTargetPathTuple;
  conditions: Rule<TActualInputTypedTarget['instance']>[];
};

export type KnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = DerivedTargetReferenceConfiguration<
  TInputTypedTarget,
  TInputTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
>;

export type PartiallyKnownDerivedTargetReferenceConfiguration<
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
> = DerivedTargetReferenceConfiguration<
  UnknownTypedTarget,
  UnknownTargetPath,
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
>;

export type UnknownDerivedTargetReferenceConfiguration =
  DerivedTargetReferenceConfiguration<
    UnknownTypedTarget,
    UnknownTargetPath,
    UnknownTypedTarget,
    UnknownTargetPath,
    [UnknownTypedTarget],
    UnknownTargetPathTuple
  >;
