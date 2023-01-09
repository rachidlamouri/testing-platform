import { UnknownAppliedRuleResult } from '../types/rule';
import { UnknownTargetReference } from '../types/targetReference';
import { getRuleConfigurationTypeId } from './getRuleConfigurationTypeId';
import { RuleConfigurationMap } from './ruleConfigurationMap';

export type RuleApplierInput = {
  ruleConfigurationMap: RuleConfigurationMap;
  targetReferences: UnknownTargetReference[];
};

export type RuleApplierResult = UnknownAppliedRuleResult[];

export const applyRules = ({
  ruleConfigurationMap,
  targetReferences,
}: RuleApplierInput): UnknownAppliedRuleResult[] => {
  const allRuleResults: UnknownAppliedRuleResult[] = targetReferences.flatMap(
    (targetReference) => {
      const ruleConfigurations = ruleConfigurationMap.getRules(targetReference);

      const ruleResults: UnknownAppliedRuleResult[] = ruleConfigurations
        .toArray()
        .map((ruleConfiguration): UnknownAppliedRuleResult => {
          const isTargetValid = ruleConfiguration.rule(
            targetReference.instance,
          );

          return {
            ruleTypeId: getRuleConfigurationTypeId(ruleConfiguration),
            targetReference,
            isTargetValid,
          };
        });

      return ruleResults;
    },
  );

  return allRuleResults;
};
