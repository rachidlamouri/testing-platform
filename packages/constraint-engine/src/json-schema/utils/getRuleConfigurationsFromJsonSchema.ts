import { Rule } from '../../types/rule';
import { UnknownRuleConfiguration } from '../../types/ruleConfiguration';
import { buildDataIsType } from '../rules/buildDataIsType';
import { JsonDataType, JsonTargetTypeId } from '../types/constants';
import { JsonObjectTarget } from '../types/targets';

export const getRuleConfigurationsFromJsonSchema = (
  inputSchema: JsonObjectTarget,
): UnknownRuleConfiguration[] => {
  const ruleConfigurations: UnknownRuleConfiguration[] = [];

  if ('type' in inputSchema) {
    ruleConfigurations.push({
      rule: buildDataIsType(inputSchema.type as JsonDataType) as Rule<unknown>,
      targetTypeId: JsonTargetTypeId.Unknown,
      normalizedTargetPath: 'data',
    });
  }

  return ruleConfigurations;
};
