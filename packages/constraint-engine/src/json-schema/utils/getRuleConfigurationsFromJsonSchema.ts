import { Rule } from '../../types/rule';
import { UnknownRuleConfiguration } from '../../types/ruleConfiguration';
import { buildDataIsType } from '../rules/buildDataIsType';
import { buildObjectHasRequiredProperties } from '../rules/buildObjectHasRequiredProperties';
import { JsonDataType, JsonTargetTypeId } from '../types/constants';
import { JsonObjectTarget } from '../types/targets';

export const getRuleConfigurationTupleFromJsonSchema = (
  inputSchema: JsonObjectTarget,
): UnknownRuleConfiguration[] => {
  const ruleConfigurationTuple: UnknownRuleConfiguration[] = [];

  if ('type' in inputSchema) {
    ruleConfigurationTuple.push({
      rule: buildDataIsType(inputSchema.type as JsonDataType) as Rule<unknown>,
      targetTypeId: JsonTargetTypeId.Unknown,
      targetPath: 'data',
    });
  }

  if ('required' in inputSchema) {
    ruleConfigurationTuple.push({
      rule: buildObjectHasRequiredProperties(
        inputSchema.required as string[],
      ) as Rule<unknown>,
      targetTypeId: JsonTargetTypeId.Object,
      targetPath: 'data',
    });
  }

  return ruleConfigurationTuple;
};
