import { UnknownTargetReferenceTuple } from '../targetReference';

export type DerivedReferenceBuilder<
  TInputTargetReferenceTuple extends UnknownTargetReferenceTuple,
  TOutputTargetReferenceTuple extends UnknownTargetReferenceTuple,
> = (
  ...inputReferences: TInputTargetReferenceTuple
) => TOutputTargetReferenceTuple;

export type NormalizedDerivedReferenceBuilder<
  TOutputTargetReferenceTuple extends UnknownTargetReferenceTuple,
> = DerivedReferenceBuilder<
  UnknownTargetReferenceTuple,
  TOutputTargetReferenceTuple
>;
