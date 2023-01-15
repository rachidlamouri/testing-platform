import { NormalizedDeprecatedDerivedReferenceBuilder } from '../types/builders/deprecatedDerivedReferenceBuilder';
import { UnknownTargetPath, UnknownTargetPathTuple } from '../types/targetPath';
import {
  DeprecatedDerivedTargetReferenceConfiguration,
  DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder,
} from '../types/targetReferenceConfiguration/deprecatedDerivedTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTypedTarget } from '../types/typedTarget';

type PartialKeys<TObject, TKey extends keyof TObject> = Omit<TObject, TKey> &
  Partial<Pick<TObject, TKey>>;

/** @deprecated */
export const buildDeprecatedDerivedTargetReferenceConfiguration = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
>({
  inputTargetTypeId,
  inputTargetPath,
  buildReference,
  conditions = [],
}: PartialKeys<
  Omit<
    DeprecatedDerivedTargetReferenceConfiguration<
      TInputTypedTarget,
      TInputTargetPath,
      TOutputTypedTargetOptionsTuple,
      TOutputTargetPathTuple
    >,
    'typeId'
  >,
  'conditions'
>): DeprecatedDerivedTargetReferenceConfigurationWithNormalizedBuilder<
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceConfiguration,
  inputTargetTypeId,
  inputTargetPath,
  buildReference: buildReference as NormalizedDeprecatedDerivedReferenceBuilder<
    TOutputTypedTargetOptionsTuple,
    TOutputTargetPathTuple
  >,
  conditions,
});
