import { UnknownTargetReference } from '../../types/targetReference';
import { UnknownDerivedTargetReferenceSetConfiguration } from '../../types/targetReferenceConfiguration/derivedTargetReferenceSetConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';

export type DerivedTargetReferenceSetsBuilderInput = {
  targetReferenceConfiguration: UnknownDerivedTargetReferenceSetConfiguration;
  targetReferenceMap: TargetReferenceMap;
};

export const buildDerivedTargetReferenceSets = ({
  targetReferenceConfiguration,
  targetReferenceMap,
}: DerivedTargetReferenceSetsBuilderInput): UnknownTargetReference[] => {
  const inputTargetReferences =
    targetReferenceMap.getTargetReferenceListByTypeIdAndNormalizedPath({
      typeId: targetReferenceConfiguration.inputTargetTypeId,
      normalizedPath: targetReferenceConfiguration.normalizedInputTargetPath,
    });

  const outputReferenceSets: UnknownTargetReference[] =
    inputTargetReferences.flatMap(
      (inputReferenceA): UnknownTargetReference[] => {
        const inputReferenceB: UnknownTargetReference = {
          typeId: inputReferenceA.typeId,
          instance: inputReferenceA.instance,
          path: inputReferenceA.instancePath,
        };

        const outputReferenceSet: UnknownTargetReference[] =
          targetReferenceConfiguration.buildReferenceSet(inputReferenceB);

        return outputReferenceSet;
      },
    );

  return outputReferenceSets;
};
