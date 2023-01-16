import {
  DeprecatedDerivedReferenceSetBuilderInputAndOutput,
  NormalizedDeprecatedDerivedReferenceSetBuilder,
} from '../types/builders/deprecatedDerivedReferenceSetBuilder';
import {
  DeprecatedDerivedTargetReferenceSetConfiguration,
  DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedBuilder,
} from '../types/targetReferenceConfiguration/deprecatedDerivedTargetReferenceSetConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';

/** @deprecated */
export const buildDeprecatedDerivedTargetReferenceSetConfiguration = <
  TDeprecatedDerivedReferenceSetBuilderInputAndOutput extends DeprecatedDerivedReferenceSetBuilderInputAndOutput,
>({
  inputTargetTypeId,
  inputTargetPath,
  buildReferenceSet,
}: Omit<
  DeprecatedDerivedTargetReferenceSetConfiguration<TDeprecatedDerivedReferenceSetBuilderInputAndOutput>,
  'typeId'
>): DeprecatedDerivedTargetReferenceSetConfigurationWithNormalizedBuilder<TDeprecatedDerivedReferenceSetBuilderInputAndOutput> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceSetConfiguration,
  inputTargetTypeId,
  inputTargetPath,
  buildReferenceSet:
    buildReferenceSet as NormalizedDeprecatedDerivedReferenceSetBuilder<TDeprecatedDerivedReferenceSetBuilderInputAndOutput>,
});
