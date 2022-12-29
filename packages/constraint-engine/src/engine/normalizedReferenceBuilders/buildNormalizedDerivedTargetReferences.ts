import {
  UnknownNormalizedTargetReference,
  UnknownTargetReference,
} from '../../types/targetReference';
import { UnknownDerivedTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { NormalizedTargetReferenceMap } from '../normalizedTargetReferenceMap';

export type NormalizedDerivedTargetReferencesBuilderInput = {
  targetReferenceConfiguration: UnknownDerivedTargetReferenceConfiguration;
  normalizedTargetReferenceMap: NormalizedTargetReferenceMap;
};

export const buildNormalizedDerivedTargetReferences = ({
  targetReferenceConfiguration,
  normalizedTargetReferenceMap,
}: NormalizedDerivedTargetReferencesBuilderInput): UnknownNormalizedTargetReference[] => {
  const normalizedInputTargetReferences =
    normalizedTargetReferenceMap.getNormalizedTargetReferenceListByTypeIdAndNormalizedPath(
      {
        typeId: targetReferenceConfiguration.inputTargetTypeId,
        normalizedPath: targetReferenceConfiguration.normalizedInputTargetPath,
      },
    );

  const normalizedOutputTargetReferences: UnknownNormalizedTargetReference[] =
    normalizedInputTargetReferences.flatMap(
      (normalizedInputTargetReference): UnknownNormalizedTargetReference => {
        const inputReference: UnknownTargetReference = {
          typeId: normalizedInputTargetReference.typeId,
          instance: normalizedInputTargetReference.instance,
          path: normalizedInputTargetReference.instancePath,
        };
        const outputReference =
          targetReferenceConfiguration.buildReference(inputReference);

        return {
          typeId: outputReference.typeId,
          instance: outputReference.instance,
          instancePath: outputReference.path,
          normalizedPath:
            targetReferenceConfiguration.normalizedOutputTargetPath,
        };
      },
    );

  return normalizedOutputTargetReferences;
};
