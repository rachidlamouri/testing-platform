import {
  DerivedTargetReferenceBuilderInputAndOutput,
  NormalizedDerivedReferenceBuilder,
} from '../types/builders/derivedReferenceBuilder';
import {
  DerivedTargetReferenceConfiguration,
  DerivedTargetReferenceConfigurationWithNormalizedBuilder,
} from '../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';

export const buildDerivedTargetReferenceConfiguration = <
  TDerivedReferenceBuilderInputAndOutput extends DerivedTargetReferenceBuilderInputAndOutput,
>({
  buildReferenceTuple,
  inputTypedTargeTuple,
}: Omit<
  DerivedTargetReferenceConfiguration<TDerivedReferenceBuilderInputAndOutput>,
  'typeId'
>): DerivedTargetReferenceConfigurationWithNormalizedBuilder<TDerivedReferenceBuilderInputAndOutput> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
  inputTypedTargeTuple,
  buildReferenceTuple:
    buildReferenceTuple as NormalizedDerivedReferenceBuilder<TDerivedReferenceBuilderInputAndOutput>,
});
