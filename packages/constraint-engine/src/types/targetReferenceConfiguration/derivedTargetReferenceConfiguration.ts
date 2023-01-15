import { DerivedReferenceBuilder } from '../builders/derivedReferenceBuilder';
import { UnknownTargetReferenceTuple } from '../targetReference';
import { TypedTargetTupleFromTargetReferenceTuple } from '../typedTargetFromTargetReference';
import { TargetReferenceConfigurationTypeId } from './typeId';

type BaseDerivedTargetReferenceConfiguration<
  TEngineInputTargetReferenceTuple extends UnknownTargetReferenceTuple,
  TConfigurationInputTargetReferenceTuple extends UnknownTargetReferenceTuple,
  TOutputTargetReferenceTuple extends UnknownTargetReferenceTuple,
> = {
  typeId: TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration;
  buildReferences: DerivedReferenceBuilder<
    TEngineInputTargetReferenceTuple,
    TOutputTargetReferenceTuple
  >;
  inputTypedTargeTuple: TypedTargetTupleFromTargetReferenceTuple<TConfigurationInputTargetReferenceTuple>;
};

export type DerivedTargetReferenceConfiguration<
  TInputTargetReferenceTuple extends UnknownTargetReferenceTuple,
  TOutputTargetReferenceTuple extends UnknownTargetReferenceTuple,
> = BaseDerivedTargetReferenceConfiguration<
  TInputTargetReferenceTuple,
  TInputTargetReferenceTuple,
  TOutputTargetReferenceTuple
>;

export type DerivedTargetReferenceConfigurationWithNormalizedBuilder<
  TOutputTargetReferenceTuple extends UnknownTargetReferenceTuple,
> = BaseDerivedTargetReferenceConfiguration<
  UnknownTargetReferenceTuple,
  UnknownTargetReferenceTuple,
  TOutputTargetReferenceTuple
>;

export type UnknownDerivedTargetReferenceConfiguration =
  BaseDerivedTargetReferenceConfiguration<
    UnknownTargetReferenceTuple,
    UnknownTargetReferenceTuple,
    UnknownTargetReferenceTuple
  >;
