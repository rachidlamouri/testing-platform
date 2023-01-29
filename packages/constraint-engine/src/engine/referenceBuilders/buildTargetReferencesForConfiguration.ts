import { UnknownTargetReference } from '../../types/targetReference';
import { TargetReferenceConfigurationTypeId } from '../../types/targetReferenceConfiguration/typeId';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';
import { buildDeprecatedDerivedTargetReferences } from './buildDeprecatedDerivedTargetReferences';
import { buildDeprecatedDerivedTargetReferenceSets } from './buildDeprecatedDerivedTargetReferenceSets';

export type TargetReferencesBuilderInput = {
  targetReferenceConfiguration: UnknownTargetReferenceConfiguration;
  targetReferenceMap: TargetReferenceMap;
};

export const buildTargetReferencesForConfiguration = ({
  targetReferenceConfiguration,
  targetReferenceMap,
}: TargetReferencesBuilderInput): UnknownTargetReference[] => {
  switch (targetReferenceConfiguration.typeId) {
    case TargetReferenceConfigurationTypeId.StaticTargetReferenceConfiguration:
      return [targetReferenceConfiguration.outputTargetReference];
    case TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceConfiguration: {
      return buildDeprecatedDerivedTargetReferences({
        targetReferenceConfiguration,
        targetReferenceMap,
      });
    }
    case TargetReferenceConfigurationTypeId.DeprecatedDerivedTargetReferenceSetConfiguration: {
      return buildDeprecatedDerivedTargetReferenceSets({
        targetReferenceConfiguration,
        targetReferenceMap,
      });
    }
  }
};
