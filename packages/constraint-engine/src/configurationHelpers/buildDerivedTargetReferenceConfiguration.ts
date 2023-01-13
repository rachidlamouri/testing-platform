import { NormalizedDerivedReferenceBuilder } from '../types/builders/derivedReferenceBuilder';
import { UnknownTargetPath, UnknownTargetPathTuple } from '../types/targetPath';
import {
  DerivedTargetReferenceConfiguration,
  DerivedTargetReferenceConfigurationWithNormalizedBuilder,
} from '../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { TargetReferenceConfigurationTypeId } from '../types/targetReferenceConfiguration/typeId';
import { UnknownTypedTarget } from '../types/typedTarget';

type PartialKeys<TObject, TKey extends keyof TObject> = Omit<TObject, TKey> &
  Partial<Pick<TObject, TKey>>;

export const buildDerivedTargetReferenceConfiguration = <
  TInputTypedTarget extends UnknownTypedTarget,
  TInputTargetPath extends UnknownTargetPath,
  TOutputTypedTargetOptionsTuple extends readonly UnknownTypedTarget[],
  TOutputTargetPathTuple extends UnknownTargetPathTuple,
>({
  inputTargetTypeId,
  inputTargetPath,
  outputTargetTypeId,
  outputTargetPaths,
  buildReference,
  conditions = [],
}: PartialKeys<
  Omit<
    DerivedTargetReferenceConfiguration<
      TInputTypedTarget,
      TInputTargetPath,
      TOutputTypedTargetOptionsTuple,
      TOutputTargetPathTuple
    >,
    'typeId'
  >,
  'conditions'
>): DerivedTargetReferenceConfigurationWithNormalizedBuilder<
  TInputTypedTarget,
  TInputTargetPath,
  TOutputTypedTargetOptionsTuple,
  TOutputTargetPathTuple
> => ({
  typeId:
    TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration,
  inputTargetTypeId,
  inputTargetPath,
  outputTargetTypeId,
  outputTargetPaths,
  buildReference: buildReference as NormalizedDerivedReferenceBuilder<
    TOutputTypedTargetOptionsTuple,
    TOutputTargetPathTuple
  >,
  conditions,
});
