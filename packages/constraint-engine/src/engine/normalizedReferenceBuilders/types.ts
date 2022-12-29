import { UnknownNormalizedTargetReference } from '../../types/targetReference';
import { UnknownTargetReferenceConfiguration } from '../../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { NormalizedTargetReferenceMap } from '../targetInformationMap';

export type NormalizedTargetReferenceBuilderInput = {
  targetReferenceConfiguration: UnknownTargetReferenceConfiguration;
  normalizedTargetReferenceMap: NormalizedTargetReferenceMap<UnknownNormalizedTargetReference>;
};
