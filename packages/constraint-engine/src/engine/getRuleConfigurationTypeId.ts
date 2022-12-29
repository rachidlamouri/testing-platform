import { UnknownRuleTypeId } from '../types/rule';
import { UnknownRuleConfiguration } from '../types/ruleConfiguration';

export const getRuleConfigurationTypeId = (
  ruleConfiguration: UnknownRuleConfiguration,
): UnknownRuleTypeId => {
  return ruleConfiguration.rule.name;
};
