import { UnknownAppliedRuleResult } from '../types/rule';
import { UnknownNormalizedTargetReference } from '../types/targetReference';
import { getRuleConfigurationTypeId } from './getRuleConfigurationTypeId';
import { RuleConfigurationMap } from './ruleConfigurationMap';

export type RuleApplierInput = {
  ruleConfigurationMap: RuleConfigurationMap;
  targetReferences: UnknownNormalizedTargetReference[];
};

export type RuleApplierResult = UnknownAppliedRuleResult[];

export const applyRules = ({
  ruleConfigurationMap,
  targetReferences,
}: RuleApplierInput): UnknownAppliedRuleResult[] => {
  const allRuleResults: UnknownAppliedRuleResult[] = targetReferences.flatMap(
    (targetReference) => {
      const ruleConfigurations = ruleConfigurationMap.getRules(targetReference);

      const ruleResults: UnknownAppliedRuleResult[] = ruleConfigurations.map(
        (ruleConfiguration) => {
          const isTargetValid = ruleConfiguration.rule(
            targetReference.instance,
          );

          return {
            ruleTypeId: getRuleConfigurationTypeId(ruleConfiguration),
            targetTypeId: targetReference.typeId,
            normalizedTargetPath: targetReference.normalizedPath,
            targetInstancePath: targetReference.instancePath,
            targetInstance: targetReference.instance,
            isTargetValid,
          } satisfies UnknownAppliedRuleResult;
        },
      );

      return ruleResults;
    },
  );

  return allRuleResults;
};
