import { UnknownNormalizedTargetReference } from '../../types/targetReference';
import { TargetReferenceConfigurationTypeId } from '../../types/targetReferenceConfiguration/typeId';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { NormalizedTargetReferenceMap } from '../targetReferenceMap';
import { buildNormalizedDerivedTargetReferences } from './buildDerivedTargetReferences';
import { buildNormalizedDerivedTargetReferenceSets } from './buildDerivedTargetReferenceSets';
import { buildNormalizedRootTargetReference } from './buildRootTargetReference';

export type NormalizedTargetReferencesBuilderInput = {
  targetReferenceConfiguration: UnknownTargetReferenceConfiguration;
  normalizedTargetReferenceMap: NormalizedTargetReferenceMap;
};

export const buildNormalizedTargetReferencesForConfiguration = ({
  targetReferenceConfiguration,
  normalizedTargetReferenceMap,
}: NormalizedTargetReferencesBuilderInput): UnknownNormalizedTargetReference[] => {
  switch (targetReferenceConfiguration.typeId) {
    case TargetReferenceConfigurationTypeId.RootTargetReferenceConfiguration:
      return [
        buildNormalizedRootTargetReference({
          targetReferenceConfiguration,
        }),
      ];
    case TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration: {
      return buildNormalizedDerivedTargetReferences({
        targetReferenceConfiguration,
        normalizedTargetReferenceMap,
      });
    }
    case TargetReferenceConfigurationTypeId.DerivedTargetReferenceSetConfiguration: {
      return buildNormalizedDerivedTargetReferenceSets({
        targetReferenceConfiguration,
        normalizedTargetReferenceMap,
      });
    }
  }
};
