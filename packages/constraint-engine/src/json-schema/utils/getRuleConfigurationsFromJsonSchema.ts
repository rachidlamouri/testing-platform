import { UnknownRuleConfiguration } from '../../types/ruleConfiguration';
import { buildDataIsType } from '../rules/buildDataIsType';
import { JsonDataType, JsonMetaTargetTypeId } from '../types/constants';
import { JsonObjectTarget } from '../types/targets';

export const getRuleConfigurationsFromJsonSchema = (
  inputSchema: JsonObjectTarget,
): UnknownRuleConfiguration[] => {
  return [
    {
      rule: buildDataIsType(inputSchema.type as JsonDataType),
      targetTypeId: JsonMetaTargetTypeId.KnownType,
      normalizedTargetPath: 'data',
    },
  ] as unknown as UnknownRuleConfiguration[];
};
