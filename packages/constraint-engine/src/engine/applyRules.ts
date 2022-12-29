import { UnknownNormalizedAppliedRuleResult } from '../types/rule';
import { UnknownNormalizedTargetReference } from '../types/targetReference';
import { RuleConfigurationMap } from './ruleConfigurationMap';

export type RuleApplierInput = {
  ruleConfigurationMap: RuleConfigurationMap;
  targetReferences: UnknownNormalizedTargetReference[];
};

export type RuleApplierResult = UnknownNormalizedAppliedRuleResult[];

export const applyRules = ({
  ruleConfigurationMap,
  targetReferences,
}: RuleApplierInput): UnknownNormalizedAppliedRuleResult[] => {
  const allRuleResults: UnknownNormalizedAppliedRuleResult[] =
    targetReferences.flatMap((targetReference) => {
      const ruleConfigurations = ruleConfigurationMap.getRules(targetReference);

      const ruleResults: UnknownNormalizedAppliedRuleResult[] =
        ruleConfigurations.map((ruleConfiguration) => {
          const isTargetValid = ruleConfiguration.rule(
            targetReference.instance,
          );

          return {
            ruleTypeId: ruleConfiguration.rule.name,
            targetTypeId: targetReference.typeId,
            normalizedTargetPath: targetReference.normalizedPath,
            targetInstancePath: targetReference.instancePath,
            isTargetValid,
          } satisfies UnknownNormalizedAppliedRuleResult;
        });

      return ruleResults;
    });

  return allRuleResults;
};
