import {
  RuleConfigurationFromTargetReferenceConfigurations,
  UnknownRuleConfiguration,
} from '../types/ruleConfiguration';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';

export const buildRuleConfiguration = <
  TTargetReferenceConfigurations extends readonly UnknownTargetReferenceConfiguration[],
>({
  targetTypeId,
  normalizedTargetPath,
  rule,
}: RuleConfigurationFromTargetReferenceConfigurations<TTargetReferenceConfigurations>): UnknownRuleConfiguration => {
  return {
    targetTypeId,
    normalizedTargetPath,
    rule,
  };
};
