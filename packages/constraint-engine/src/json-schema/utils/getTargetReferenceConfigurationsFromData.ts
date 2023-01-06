import { buildDerivedTargetReferenceConfiguration } from '../../configurationHelpers/buildDerivedTargetReferenceConfiguration';
import { buildRootTargetReferenceConfiguration } from '../../configurationHelpers/buildRootTargetReferenceConfiguration';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { buildDerivedTypedJsonReference } from '../referenceBuilders/buildDerivedTypedJsonReference';
import { buildRootJsonReference } from '../referenceBuilders/buildRootUntypedJsonReference';
import { JsonTargetTypeId, RootJsonDataTargetPath } from '../types/constants';
import { JsonTarget } from '../types/targets';
import {
  JsonKnownTypedTargetOptions,
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
      JsonKnownTypedTargetOptions,
      RootJsonDataTargetPath
    >({
      buildReference: buildDerivedTypedJsonReference,
      inputTargetTypeId: JsonTargetTypeId.Unknown,
      normalizedInputTargetPath: 'data',
      outputTargetTypeId: [
        JsonTargetTypeId.String,
        JsonTargetTypeId.Number,
        JsonTargetTypeId.Boolean,
        JsonTargetTypeId.Null,
        JsonTargetTypeId.Array,
        JsonTargetTypeId.Object,
      ],
      normalizedOutputTargetPath: 'data',
    }),
  ] as unknown as UnknownTargetReferenceConfiguration[];
};
