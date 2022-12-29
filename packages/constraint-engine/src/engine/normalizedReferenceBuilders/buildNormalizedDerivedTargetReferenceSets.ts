import {
  UnknownNormalizedTargetReference,
  UnknownTargetReference,
} from '../../types/targetReference';
import { UnknownDerivedTargetReferenceSetConfiguration } from '../../types/targetReferenceConfiguration/derivedTargetReferenceSetConfiguration';
import { NormalizedTargetReferenceMap } from '../normalizedTargetReferenceMap';

export type NormalizedDerivedTargetReferenceSetsBuilderInput = {
  targetReferenceConfiguration: UnknownDerivedTargetReferenceSetConfiguration;
  normalizedTargetReferenceMap: NormalizedTargetReferenceMap;
};

export const buildNormalizedDerivedTargetReferenceSets = ({
  targetReferenceConfiguration,
  normalizedTargetReferenceMap,
}: NormalizedDerivedTargetReferenceSetsBuilderInput): UnknownNormalizedTargetReference[] => {
  const normalizedInputTargetReferences =
    normalizedTargetReferenceMap.getNormalizedTargetReferenceListByTypeIdAndNormalizedPath(
      {
        typeId: targetReferenceConfiguration.inputTargetTypeId,
        normalizedPath: targetReferenceConfiguration.normalizedInputTargetPath,
      },
    );

  const normalizedOutputReferenceSets: UnknownNormalizedTargetReference[] =
    normalizedInputTargetReferences.flatMap(
      (normalizedInputReference): UnknownNormalizedTargetReference[] => {
        const inputReference: UnknownTargetReference = {
          typeId: normalizedInputReference.typeId,
          instance: normalizedInputReference.instance,
          path: normalizedInputReference.instancePath,
        };

        const outputReferenceSet: UnknownTargetReference[] =
          targetReferenceConfiguration.buildReferenceSet(inputReference);

        const normalizedOutputReferenceSet: UnknownNormalizedTargetReference[] =
          outputReferenceSet.flatMap(
            (outputReference): UnknownNormalizedTargetReference => {
              return {
                typeId: outputReference.typeId,
                instance: outputReference.instance,
                instancePath: outputReference.path,
                normalizedPath:
                  targetReferenceConfiguration.normalizedOutputTargetPath,
              };
            },
          );

        return normalizedOutputReferenceSet;
      },
    );

  return normalizedOutputReferenceSets;
};
