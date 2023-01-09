import { UnknownNormalizedTargetReference } from '../../types/targetReference';
import { UnknownRootTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/rootTargetReferenceConfiguration';

export type NormalizedRootTargetReferenceBuilderInput = {
  targetReferenceConfiguration: UnknownRootTargetReferenceConfiguration;
};

export const buildNormalizedRootTargetReference = ({
  targetReferenceConfiguration,
}: NormalizedRootTargetReferenceBuilderInput): UnknownNormalizedTargetReference => {
  const outputReference = targetReferenceConfiguration.buildReference(
    targetReferenceConfiguration.inputData,
  );

  return {
    typeId: outputReference.typeId,
    instance: outputReference.instance,
    instancePath: outputReference.path,
    normalizedPath: targetReferenceConfiguration.normalizedOutputTargetPath,
  };
};
