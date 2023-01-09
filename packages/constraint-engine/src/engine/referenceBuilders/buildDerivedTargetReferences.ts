import {
  UnknownNormalizedTargetReference,
  UnknownTargetReference,
} from '../../types/targetReference';
import { UnknownDerivedTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { NormalizedTargetReferenceMap } from '../targetReferenceMap';

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
    normalizedInputTargetReferences
      .map(
        (normalizedInputTargetReference): UnknownTargetReference => ({
          typeId: normalizedInputTargetReference.typeId,
          instance: normalizedInputTargetReference.instance,
          path: normalizedInputTargetReference.instancePath,
        }),
      )
      .filter((inputReference) => {
        return targetReferenceConfiguration.conditions.every((condition) =>
          condition(inputReference.instance),
        );
      })
      .flatMap((inputReference): UnknownNormalizedTargetReference => {
        const outputReference =
          targetReferenceConfiguration.buildReference(inputReference);

        return {
          typeId: outputReference.typeId,
          instance: outputReference.instance,
          instancePath: outputReference.path,
          normalizedPath:
            targetReferenceConfiguration.normalizedOutputTargetPath,
        };
      });

  return normalizedOutputTargetReferences;
};
