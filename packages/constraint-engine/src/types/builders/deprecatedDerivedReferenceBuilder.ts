import { UnknownTargetPath, UnknownTargetPathTuple } from '../targetPath';
import { TargetReference, TargetReferenceTuple } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';
import { Merge } from '../utilityTypes/merge/merge';
import { MergePick } from '../utilityTypes/merge/mergePick';

/** @deprecated */
export type DeprecatedDerivedReferenceBuilderInput = {
  InputTypedTarget: UnknownTypedTarget;
  InputTargetPath: UnknownTargetPath;
};

/** @deprecated */
export type DeprecatedDerivedReferenceBuilderOutput = {
  OutputTypedTargetOptionsTuple: readonly UnknownTypedTarget[];
  OutputTargetPathTuple: UnknownTargetPathTuple;
};

/** @deprecated */
export type DeprecatedDerivedReferenceBuilderInputAndOutput = Merge<
  DeprecatedDerivedReferenceBuilderInput,
  DeprecatedDerivedReferenceBuilderOutput
>;

/** @deprecated */
export type DeprecatedDerivedReferenceBuilder<
  T extends DeprecatedDerivedReferenceBuilderInputAndOutput,
> = (
  inputReference: TargetReference<T['InputTypedTarget'], T['InputTargetPath']>,
) => TargetReferenceTuple<
  T['OutputTypedTargetOptionsTuple'][number],
  T['OutputTargetPathTuple']
>;

/** @deprecated */
export type NormalizedDeprecatedDerivedReferenceBuilder<
  TDeprecatedDerivedReferenceBuilderOutput extends DeprecatedDerivedReferenceBuilderOutput,
> = DeprecatedDerivedReferenceBuilder<
  MergePick<
    {
      A: DeprecatedDerivedReferenceBuilderInput;
      BConstraint: DeprecatedDerivedReferenceBuilderOutput;
    },
    { B: TDeprecatedDerivedReferenceBuilderOutput }
  >
>;
