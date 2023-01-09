import {
  UnknownNormalizedTargetReference,
  UnknownTargetReference,
} from '../../types/targetReference';
import { UnknownDerivedTargetReferenceSetConfiguration } from '../../types/targetReferenceConfiguration/derivedTargetReferenceSetConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';

export type DerivedTargetReferenceSetsBuilderInput = {
  targetReferenceConfiguration: UnknownDerivedTargetReferenceSetConfiguration;
  targetReferenceMap: TargetReferenceMap;
};

export const buildDerivedTargetReferenceSets = ({
  targetReferenceConfiguration,
  targetReferenceMap,
}: DerivedTargetReferenceSetsBuilderInput): UnknownNormalizedTargetReference[] => {
  const inputTargetReferences =
    targetReferenceMap.getTargetReferenceListByTypeIdAndNormalizedPath({
      typeId: targetReferenceConfiguration.inputTargetTypeId,
      normalizedPath: targetReferenceConfiguration.normalizedInputTargetPath,
    });

  const outputReferenceSets: UnknownNormalizedTargetReference[] =
    inputTargetReferences.flatMap(
      (inputReferenceA): UnknownNormalizedTargetReference[] => {
        const inputReferenceB: UnknownTargetReference = {
          typeId: inputReferenceA.typeId,
          instance: inputReferenceA.instance,
          path: inputReferenceA.instancePath,
        };

        const outputReferenceSetA: UnknownTargetReference[] =
          targetReferenceConfiguration.buildReferenceSet(inputReferenceB);

        const outputReferenceSetB: UnknownNormalizedTargetReference[] =
          outputReferenceSetA.map(
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

        return outputReferenceSetB;
      },
    );

  return outputReferenceSets;
};
