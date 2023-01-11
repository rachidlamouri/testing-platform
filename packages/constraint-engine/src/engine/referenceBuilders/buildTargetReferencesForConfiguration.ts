import { UnknownTargetReference } from '../../types/targetReference';
import { TargetReferenceConfigurationTypeId } from '../../types/targetReferenceConfiguration/typeId';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { TargetReferenceMap } from '../targetReferenceMap';
import { buildDerivedTargetReferences } from './buildDerivedTargetReferences';
import { buildDerivedTargetReferenceSets } from './buildDerivedTargetReferenceSets';

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
    case TargetReferenceConfigurationTypeId.DerivedTargetReferenceConfiguration: {
      return buildDerivedTargetReferences({
        targetReferenceConfiguration,
        targetReferenceMap,
      });
    }
    case TargetReferenceConfigurationTypeId.DerivedTargetReferenceSetConfiguration: {
      return buildDerivedTargetReferenceSets({
        targetReferenceConfiguration,
        targetReferenceMap,
      });
    }
  }
};
