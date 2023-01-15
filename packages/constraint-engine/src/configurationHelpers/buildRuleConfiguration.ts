import {
  RuleConfigurationFromTargetReferenceConfigurationTuple,
  UnknownRuleConfiguration,
} from '../types/ruleConfiguration';
import { UnknownTargetReferenceConfigurationTuple } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';

export const buildRuleConfiguration = <
  TTargetReferenceConfigurationTuple extends UnknownTargetReferenceConfigurationTuple,
>({
  targetTypeId,
  targetPath,
  rule,
}: RuleConfigurationFromTargetReferenceConfigurationTuple<TTargetReferenceConfigurationTuple>): UnknownRuleConfiguration => {
  return {
    targetTypeId,
    targetPath,
    rule,
  };
};
