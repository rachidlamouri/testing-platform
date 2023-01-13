import { DerivedReferenceBuilder } from '../../types/builders/derivedReferenceBuilder';
import {
  UnknownTargetPath,
  UnknownTargetPathTuple,
} from '../../types/targetPath';
import {
  TargetReference,
  TargetReferenceTuple,
} from '../../types/targetReference';
import { JSON_DATA_TYPE_TO_TARGET_TYPE_ID } from '../types/constants';
import {
  JsonKnownTypedTarget,
  JsonKnownTypedTargetOptionsTuple,
  JsonUnknownTypedTarget,
} from '../types/typedTargets';
import { getJsonDataType } from '../utils/getJsonDataType';

export const buildDerivedTypedJsonReference = (<
  TInputTargetPath extends UnknownTargetPath,
>(
  inputReference: TargetReference<JsonUnknownTypedTarget, TInputTargetPath>,
): TargetReferenceTuple<JsonKnownTypedTarget, [TInputTargetPath]> => {
  const jsonDataType = getJsonDataType(inputReference.instance);

  const outputReference: TargetReference<
    JsonKnownTypedTarget,
    TInputTargetPath
  > = {
    typeId: JSON_DATA_TYPE_TO_TARGET_TYPE_ID[jsonDataType],
    instance: inputReference.instance,
    path: inputReference.path,
  };

  return [outputReference];
}) satisfies DerivedReferenceBuilder<
  JsonUnknownTypedTarget,
  UnknownTargetPath,
  JsonKnownTypedTargetOptionsTuple,
  UnknownTargetPathTuple
>;
