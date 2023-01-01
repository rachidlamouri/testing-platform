import { DerivedReferenceBuilder } from '../../types/builders/derivedReferenceBuilder';
import { UnknownTargetPath } from '../../types/targetPath';
import { TargetReference } from '../../types/targetReference';
import { JsonMetaTargetTypeId } from '../types/constants';
import { JsonTypedTargetTarget } from '../types/targets';
import {
  JsonMetaUnknownTypedTarget,
  JsonMetaKnownTypedTarget,
} from '../types/typedTargets';
import { getJsonDataType } from '../utils/getJsonDataType';

export const buildDerivedTypedJsonReference = (<
  TInputTargetPath extends UnknownTargetPath,
>(
  inputReference: TargetReference<JsonMetaUnknownTypedTarget, TInputTargetPath>,
): TargetReference<JsonMetaKnownTypedTarget, TInputTargetPath> => {
  const jsonDataType = getJsonDataType(inputReference.instance);

  const outputReference: TargetReference<
    JsonMetaKnownTypedTarget,
    TInputTargetPath
  > = {
    typeId: JsonMetaTargetTypeId.KnownType,
    instance: {
      typeId: jsonDataType,
      instance: inputReference.instance,
    } as JsonTypedTargetTarget,
    path: inputReference.path,
  };

  return outputReference;
}) satisfies DerivedReferenceBuilder<
  JsonMetaUnknownTypedTarget,
  UnknownTargetPath,
  JsonMetaKnownTypedTarget,
  UnknownTargetPath
>;
