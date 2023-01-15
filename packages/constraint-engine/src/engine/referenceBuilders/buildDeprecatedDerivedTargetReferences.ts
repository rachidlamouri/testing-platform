import { UnknownTargetReference } from '../../types/targetReference';
import { UnknownDeprecatedDerivedTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/deprecatedDerivedTargetReferenceConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';

/** @deprecated */
export type DeprecatedDerivedTargetReferencesBuilderInput = {
  targetReferenceConfiguration: UnknownDeprecatedDerivedTargetReferenceConfiguration;
  targetReferenceMap: TargetReferenceMap;
};

/** @deprecated */
export const buildDerivedDerivedTargetReferences = ({
  targetReferenceConfiguration,
  targetReferenceMap,
}: DeprecatedDerivedTargetReferencesBuilderInput): UnknownTargetReference[] => {
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
