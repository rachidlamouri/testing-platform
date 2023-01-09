import { UnknownTargetReference } from '../../types/targetReference';
import { UnknownDerivedTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/derivedTargetReferenceConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';

export type DerivedTargetReferencesBuilderInput = {
  targetReferenceConfiguration: UnknownDerivedTargetReferenceConfiguration;
  targetReferenceMap: TargetReferenceMap;
};

export const buildDerivedTargetReferences = ({
  targetReferenceConfiguration,
  targetReferenceMap,
}: DerivedTargetReferencesBuilderInput): UnknownTargetReference[] => {
  const inputTargetReferenceSet =
    targetReferenceMap.getTargetReferenceSetByTargetTypeIdAndTargetPath({
      targetTypeId: targetReferenceConfiguration.inputTargetTypeId,
      targetPath: targetReferenceConfiguration.inputTargetPath,
    });

  const outputTargetReferences: UnknownTargetReference[] =
    inputTargetReferenceSet
      .toArray()
      .filter((inputReference) => {
        return targetReferenceConfiguration.conditions.every((condition) =>
          condition(inputReference.instance),
        );
      })
      .flatMap((inputReference): readonly UnknownTargetReference[] => {
        const outputReference =
          targetReferenceConfiguration.buildReference(inputReference);

        return outputReference;
      });

  return outputTargetReferences;
};
