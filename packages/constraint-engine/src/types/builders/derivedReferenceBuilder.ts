import { UnknownTargetReferenceTuple } from '../targetReference';
import { Merge } from '../utilityTypes/merge/merge';
import { MergePick } from '../utilityTypes/merge/mergePick';

export type DerivedTargetReferenceBuilderInput = {
  InputTargetReferenceTuple: UnknownTargetReferenceTuple;
};

export type DerivedTargetReferenceBuilderOutput = {
  OutputTargetReferenceTuple: UnknownTargetReferenceTuple;
};

export type DerivedTargetReferenceBuilderInputAndOutput = Merge<
  DerivedTargetReferenceBuilderInput,
  DerivedTargetReferenceBuilderOutput
>;

export type DerivedReferenceBuilder<
  T extends DerivedTargetReferenceBuilderInputAndOutput,
> = (
  ...inputReferences: T['InputTargetReferenceTuple']
) => T['OutputTargetReferenceTuple'];

export type NormalizedDerivedReferenceBuilder<
  TDerivedTargetReferenceBuilderOutput extends DerivedTargetReferenceBuilderOutput,
> = DerivedReferenceBuilder<
  MergePick<
    {
      A: DerivedTargetReferenceBuilderInput;
      BConstraint: DerivedTargetReferenceBuilderOutput;
    },
    { B: TDerivedTargetReferenceBuilderOutput }
  >
>;
