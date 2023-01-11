import { UnknownTargetReference } from '../../types/targetReference';
import { UnknownRootTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/rootTargetReferenceConfiguration';

export type RootTargetReferenceBuilderInput = {
  targetReferenceConfiguration: UnknownRootTargetReferenceConfiguration;
};

export const buildRootTargetReference = ({
  targetReferenceConfiguration,
}: RootTargetReferenceBuilderInput): UnknownTargetReference => {
  const outputReference = targetReferenceConfiguration.buildReference(
    targetReferenceConfiguration.inputInstance,
  );

  return outputReference;
};
