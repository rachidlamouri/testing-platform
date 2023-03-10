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

export const getTargetReferenceConfigurationTupleFromJson = (
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
    buildDeprecatedDerivedTargetReferenceConfiguration<{
      InputTypedTarget: JsonUnknownTypedTarget;
      InputTargetPath: RootJsonDataTargetPath;
      OutputTypedTargetOptionsTuple: JsonKnownTypedTargetOptionsTuple;
      OutputTargetPathTuple: [RootJsonDataTargetPath];
    }>({
      buildReference: buildDerivedTypedJsonReference,
      inputTargetTypeId: JsonTargetTypeId.Unknown,
      inputTargetPath: 'data',
    }),
  ] as unknown as UnknownTargetReferenceConfiguration[];
};
