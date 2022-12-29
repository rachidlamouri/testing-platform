import { UnknownRuleConfiguration } from '../types/ruleConfiguration';
import { UnknownTargetPath } from '../types/targetPath';
import { UnknownNormalizedTargetReference } from '../types/targetReference';
import { UnknownTargetTypeId } from '../types/typedTarget';

export type RuleConfigurationsByNormalizedTargetPath = Map<
  UnknownTargetPath,
  UnknownRuleConfiguration[]
>;

export type RuleConfigurationsByNormalizedTargetPathByTargetTypeId = Map<
  UnknownTargetTypeId,
  RuleConfigurationsByNormalizedTargetPath
>;

export class RuleConfigurationMap {
  private ruleConfigurationsByNormalizedTargetPathByTargetTypeId: RuleConfigurationsByNormalizedTargetPathByTargetTypeId =
    new Map();

  setRuleConfiguration(ruleConfiguration: UnknownRuleConfiguration): void {
    const ruleConfigurationsByNormalizedTargetPath: RuleConfigurationsByNormalizedTargetPath =
      this.ruleConfigurationsByNormalizedTargetPathByTargetTypeId.get(
        ruleConfiguration.targetTypeId,
      ) ?? (new Map() as RuleConfigurationsByNormalizedTargetPath);

    const ruleConfigurationList: UnknownRuleConfiguration[] =
      ruleConfigurationsByNormalizedTargetPath.get(
        ruleConfiguration.normalizedTargetPath,
      ) ?? [];

    ruleConfigurationList.push(ruleConfiguration);
    ruleConfigurationsByNormalizedTargetPath.set(
      ruleConfiguration.normalizedTargetPath,
      ruleConfigurationList,
    );
    this.ruleConfigurationsByNormalizedTargetPathByTargetTypeId.set(
      ruleConfiguration.targetTypeId,
      ruleConfigurationsByNormalizedTargetPath,
    );
  }

  getRules(
    targetReference: UnknownNormalizedTargetReference,
  ): UnknownRuleConfiguration[] {
    const ruleConfigurationsByNormalizedTargetPath: RuleConfigurationsByNormalizedTargetPath =
      this.ruleConfigurationsByNormalizedTargetPathByTargetTypeId.get(
        targetReference.typeId,
      ) ?? (new Map() as RuleConfigurationsByNormalizedTargetPath);

    const ruleConfigurationList: UnknownRuleConfiguration[] =
      ruleConfigurationsByNormalizedTargetPath.get(
        targetReference.normalizedPath,
      ) ?? [];

    return ruleConfigurationList;
  }
}
