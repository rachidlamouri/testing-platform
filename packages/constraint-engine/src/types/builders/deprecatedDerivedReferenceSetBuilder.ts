import { UnknownTargetPath } from '../targetPath';
import { TargetReference } from '../targetReference';
import { UnknownTypedTarget } from '../typedTarget';
import { Merge } from '../utilityTypes/merge/merge';
import { MergePick } from '../utilityTypes/merge/mergePick';
import { DeprecatedDerivedReferenceBuilderInput } from './deprecatedDerivedReferenceBuilder';

/** @deprecated */
export type DeprecatedDerivedReferenceSetBuilderOutput = {
  OutputTypedTarget: UnknownTypedTarget;
  OutputTargetPath: UnknownTargetPath;
};

/** @deprecated */
export type DeprecatedDerivedReferenceSetBuilderInputAndOutput = Merge<
  DeprecatedDerivedReferenceBuilderInput,
  DeprecatedDerivedReferenceSetBuilderOutput
>;

/** @deprecated */
export type DeprecatedDerivedReferenceSetBuilder<
  T extends DeprecatedDerivedReferenceSetBuilderInputAndOutput,
> = (
  inputReference: TargetReference<T['InputTypedTarget'], T['InputTargetPath']>,
) => TargetReference<T['OutputTypedTarget'], T['OutputTargetPath']>[];

/** @deprecated */
export type NormalizedDeprecatedDerivedReferenceSetBuilder<
  TDerivedReferenceSetBuilderOutput extends DeprecatedDerivedReferenceSetBuilderOutput,
> = DeprecatedDerivedReferenceSetBuilder<
  // Merge<IDK7, Pick<T, keyof IDKShfiftyFive>>
  MergePick<
    {
      A: DeprecatedDerivedReferenceBuilderInput;
      BConstraint: DeprecatedDerivedReferenceSetBuilderOutput;
    },
    { B: TDerivedReferenceSetBuilderOutput }
  >
>;
