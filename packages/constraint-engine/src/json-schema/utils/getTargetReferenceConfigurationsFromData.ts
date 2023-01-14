import { buildDeprecatedDerivedTargetReferenceConfiguration } from '../../configurationHelpers/buildDeprecatedDerivedTargetReferenceConfiguration';
import { buildStaticTargetReferenceConfiguration } from '../../configurationHelpers/buildStaticTargetReferenceConfiguration';
import { RootTargetPath } from '../../types/targetPath';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { buildDerivedTypedJsonReference } from '../referenceBuilders/buildDerivedTypedJsonReference';
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
    buildStaticTargetReferenceConfiguration<
      RootTargetPath,
      JsonUnknownTypedTarget,
      RootJsonDataTargetPath
    >({
      inputTargetPath: '',
      outputTargetReference: {
        typeId: JsonTargetTypeId.Unknown,
        instance: data,
        path: 'data',
      },
    }),
    buildDeprecatedDerivedTargetReferenceConfiguration<
      JsonUnknownTypedTarget,
      RootJsonDataTargetPath,
      JsonKnownTypedTargetOptionsTuple,
      [RootJsonDataTargetPath]
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
      outputTargetPaths: ['data'],
    }),
  ] as unknown as UnknownTargetReferenceConfiguration[];
};
