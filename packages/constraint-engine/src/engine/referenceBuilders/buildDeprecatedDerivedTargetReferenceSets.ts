import { UnknownTargetReference } from '../../types/targetReference';
import { UnknownDeprecatedDerivedTargetReferenceSetConfiguration } from '../../types/targetReferenceConfiguration/deprecatedDerivedTargetReferenceSetConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';

/** @deprecated */
export type DeprecatedDerivedTargetReferenceSetsBuilderInput = {
  targetReferenceConfiguration: UnknownDeprecatedDerivedTargetReferenceSetConfiguration;
  targetReferenceMap: TargetReferenceMap;
};

/** @deprecated */
export const buildDeprecatedDerivedTargetReferenceSets = ({
  targetReferenceConfiguration,
  targetReferenceMap,
}: DeprecatedDerivedTargetReferenceSetsBuilderInput): UnknownTargetReference[] => {
  const inputTargetReferenceSet =
    targetReferenceMap.getTargetReferenceSetByTargetTypeIdAndTargetPath({
      targetTypeId: targetReferenceConfiguration.inputTargetTypeId,
      targetPath: targetReferenceConfiguration.inputTargetPath,
    });

  const outputReferenceSets: UnknownTargetReference[] = inputTargetReferenceSet
    .toArray()
    .flatMap((inputReference): UnknownTargetReference[] => {
      const outputReferenceSet: UnknownTargetReference[] =
        targetReferenceConfiguration.buildReferenceSet(inputReference);

      return outputReferenceSet;
    });

  return outputReferenceSets;
};
