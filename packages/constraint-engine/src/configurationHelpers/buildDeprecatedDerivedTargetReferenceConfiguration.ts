import {
  DeprecatedDerivedReferenceBuilderInputAndOutput,
  NormalizedDeprecatedDerivedReferenceBuilder,
} from '../types/builders/deprecatedDerivedReferenceBuilder';
import {
  DeprecatedDerivedTargetReferenceConfiguration,
  DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder,
} from '../types/targetReferenceConfiguration/deprecatedDerivedTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';

type PartialKeys<TObject, TKey extends keyof TObject> = Omit<TObject, TKey> &
  Partial<Pick<TObject, TKey>>;

/** @deprecated */
export const buildDeprecatedDerivedTargetReferenceConfiguration = <
  TDeprecatedDerivedReferenceBuilderInputAndOutput extends DeprecatedDerivedReferenceBuilderInputAndOutput,
>({
  inputTargetTypeId,
  inputTargetPath,
  buildReference,
  conditions = [],
}: PartialKeys<
  Omit<
    DeprecatedDerivedTargetReferenceConfiguration<TDeprecatedDerivedReferenceBuilderInputAndOutput>,
    'typeId'
  >,
  'conditions'
>): DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder<TDeprecatedDerivedReferenceBuilderInputAndOutput> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceConfiguration,
  inputTargetTypeId,
  inputTargetPath,
  buildReference:
    buildReference as NormalizedDeprecatedDerivedReferenceBuilder<TDeprecatedDerivedReferenceBuilderInputAndOutput>,
  conditions,
});
