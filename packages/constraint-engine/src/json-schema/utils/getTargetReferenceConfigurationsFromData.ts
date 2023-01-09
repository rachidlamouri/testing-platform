import { buildDerivedTargetReferenceConfiguration } from '../../configurationHelpers/buildDerivedTargetReferenceConfiguration';
import { buildRootTargetReferenceConfiguration } from '../../configurationHelpers/buildRootTargetReferenceConfiguration';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { buildDerivedTypedJsonReference } from '../referenceBuilders/buildDerivedTypedJsonReference';
import { buildRootJsonReference } from '../referenceBuilders/buildRootUntypedJsonReference';
import { JsonTargetTypeId, RootJsonDataTargetPath } from '../types/constants';
import { JsonTarget } from '../types/targets';
import {
  JsonKnownTypedTargetOptionsTuple,
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
      inputTargetPath: '',
      outputTargetTypeId: JsonTargetTypeId.Unknown,
      outputTargetPath: 'data',
    }),
    buildDerivedTargetReferenceConfiguration<
      JsonUnknownTypedTarget,
      RootJsonDataTargetPath,
      JsonKnownTypedTargetOptionsTuple,
      RootJsonDataTargetPath
    >({
      buildReference: buildDerivedTypedJsonReference,
      inputTargetTypeId: JsonTargetTypeId.Unknown,
      inputTargetPath: 'data',
      outputTargetTypeId: [
        JsonTargetTypeId.String,
        JsonTargetTypeId.Number,
        JsonTargetTypeId.Boolean,
        JsonTargetTypeId.Null,
        JsonTargetTypeId.Array,
        JsonTargetTypeId.Object,
      ],
      outputTargetPath: 'data',
    }),
  ] as unknown as UnknownTargetReferenceConfiguration[];
};
