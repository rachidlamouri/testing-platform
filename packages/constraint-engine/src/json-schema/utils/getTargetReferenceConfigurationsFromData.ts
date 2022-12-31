import { buildDerivedTargetReferenceConfiguration } from '../../configurationHelpers/buildDerivedTargetReferenceConfiguration';
import { buildRootTargetReferenceConfiguration } from '../../configurationHelpers/buildRootTargetReferenceConfiguration';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { buildDerivedTypedJsonReference } from '../referenceBuilders/buildDerivedTypedJsonReference';
import { buildRootJsonReference } from '../referenceBuilders/buildRootUntypedJsonReference';
import {
  RootJsonDataTargetPath,
  JsonMetaTargetTypeId,
} from '../types/constants';
import { JsonTarget } from '../types/targets';
import {
  JsonMetaUnknownTypedTarget,
  JsonMetaKnownTypedTarget,
} from '../types/typedTargets';

export const getTargetReferenceConfigurationsFromJson = (
  data: JsonTarget,
): UnknownTargetReferenceConfiguration[] => {
  return [
    buildRootTargetReferenceConfiguration<
      JsonTarget,
      JsonMetaUnknownTypedTarget,
      RootJsonDataTargetPath
    >({
      buildReference: buildRootJsonReference,
      inputData: data,
      normalizedInputTargetPath: '',
      outputTargetTypeId: JsonMetaTargetTypeId.UnknownType,
      normalizedOutputTargetPath: 'data',
    }),
    buildDerivedTargetReferenceConfiguration<
      JsonMetaUnknownTypedTarget,
      RootJsonDataTargetPath,
      JsonMetaKnownTypedTarget,
      RootJsonDataTargetPath
    >({
      buildReference: buildDerivedTypedJsonReference,
      inputTargetTypeId: JsonMetaTargetTypeId.UnknownType,
      normalizedInputTargetPath: 'data',
      outputTargetTypeId: JsonMetaTargetTypeId.KnownType,
      normalizedOutputTargetPath: 'data',
    }),
  ] as unknown as UnknownTargetReferenceConfiguration[];
};
