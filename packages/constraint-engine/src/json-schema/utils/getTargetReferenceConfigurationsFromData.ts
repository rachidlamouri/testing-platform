import { buildDerivedTargetReferenceConfiguration } from '../../configurationHelpers/buildDerivedTargetReferenceConfiguration';
import { buildRootTargetReferenceConfiguration } from '../../configurationHelpers/buildRootTargetReferenceConfiguration';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { buildDerivedTypedJsonReference } from '../referenceBuilders/buildDerivedTypedJsonReference';
import { buildRootJsonReference } from '../referenceBuilders/buildRootUntypedJsonReference';
import { JsonTargetTypeId, RootJsonDataTargetPath } from '../types/constants';
import { JsonTarget } from '../types/targets';
import {
  JsonKnownTypedTarget,
  JsonUnknownTypedTarget,
} from '../types/typedTargets';

export const getTargetReferenceConfigurationsFromJson = (
  data: JsonTarget,
): UnknownTargetReferenceConfiguration[] => {
  return [
    buildRootTargetReferenceConfiguration<
      JsonTarget,
      JsonUnknownTypedTarget,
      RootJsonDataTargetPath
    >({
      buildReference: buildRootJsonReference,
      inputData: data,
      normalizedInputTargetPath: '',
      outputTargetTypeId: JsonTargetTypeId.Unknown,
      normalizedOutputTargetPath: 'data',
    }),
    buildDerivedTargetReferenceConfiguration<
      JsonUnknownTypedTarget,
      RootJsonDataTargetPath,
      JsonKnownTypedTarget,
      RootJsonDataTargetPath
    >({
      buildReference: buildDerivedTypedJsonReference,
      inputTargetTypeId: JsonTargetTypeId.Unknown,
      normalizedInputTargetPath: 'data',
      // FIXME: outputTargetTypeId should be a list
      outputTargetTypeId: JsonTargetTypeId.Object,
      normalizedOutputTargetPath: 'data',
    }),
  ] as unknown as UnknownTargetReferenceConfiguration[];
};
