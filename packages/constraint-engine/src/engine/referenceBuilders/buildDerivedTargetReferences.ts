import {
  UnknownNormalizedTargetReference,
  UnknownTargetReference,
} from '../../types/targetReference';
import { UnknownDerivedTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';

export type DerivedTargetReferencesBuilderInput = {
  targetReferenceConfiguration: UnknownDerivedTargetReferenceConfiguration;
  targetReferenceMap: TargetReferenceMap;
};

export const buildDerivedTargetReferences = ({
  targetReferenceConfiguration,
  targetReferenceMap,
}: DerivedTargetReferencesBuilderInput): UnknownNormalizedTargetReference[] => {
  const inputTargetReferences =
    targetReferenceMap.getTargetReferenceListByTypeIdAndNormalizedPath({
      typeId: targetReferenceConfiguration.inputTargetTypeId,
      normalizedPath: targetReferenceConfiguration.normalizedInputTargetPath,
    });

  const outputTargetReferences: UnknownNormalizedTargetReference[] =
    inputTargetReferences
      .map(
        (inputTargetReference): UnknownTargetReference => ({
          typeId: inputTargetReference.typeId,
          instance: inputTargetReference.instance,
          path: inputTargetReference.instancePath,
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

  return outputTargetReferences;
};
