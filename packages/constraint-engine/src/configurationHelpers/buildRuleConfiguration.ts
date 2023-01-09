import {
  RuleConfigurationFromTargetReferenceConfigurations,
  UnknownRuleConfiguration,
} from '../types/ruleConfiguration';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';

export const buildRuleConfiguration = <
  TTargetReferenceConfigurations extends readonly UnknownTargetReferenceConfiguration[],
>({
  targetTypeId,
  targetPath,
  rule,
}: RuleConfigurationFromTargetReferenceConfigurations<TTargetReferenceConfigurations>): UnknownRuleConfiguration => {
  return {
    targetTypeId,
    targetPath,
    rule,
  };
};
