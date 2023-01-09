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
