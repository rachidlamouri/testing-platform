import {
  UnknownRuleConfiguration,
  UnknownRuleConfigurationSet,
} from '../types/ruleConfiguration';
import { UnknownTargetPath } from '../types/targetPath';
import { UnknownTargetReference } from '../types/targetReference';
import { UnknownTargetTypeId } from '../types/typedTarget';
import { CustomSet } from '../utils/customSet';

export type RuleConfigurationsByTargetPath = Map<
  UnknownTargetPath,
  UnknownRuleConfigurationSet
>;

export type RuleConfigurationsByTargetPathByTargetTypeId = Map<
  UnknownTargetTypeId,
  RuleConfigurationsByTargetPath
>;

export class RuleConfigurationMap {
  private ruleConfigurationsByTargetPathByTargetTypeId: RuleConfigurationsByTargetPathByTargetTypeId =
    new Map();

  setRuleConfiguration(ruleConfiguration: UnknownRuleConfiguration): void {
    const ruleConfigurationsByTargetPath: RuleConfigurationsByTargetPath =
      this.ruleConfigurationsByTargetPathByTargetTypeId.get(
        ruleConfiguration.targetTypeId,
      ) ?? (new Map() as RuleConfigurationsByTargetPath);

    const ruleConfigurationList: UnknownRuleConfigurationSet =
      ruleConfigurationsByTargetPath.get(
        ruleConfiguration.normalizedTargetPath,
      ) ?? new CustomSet();

    ruleConfigurationList.add(ruleConfiguration);
    ruleConfigurationsByTargetPath.set(
      ruleConfiguration.normalizedTargetPath,
      ruleConfigurationList,
    );
    this.ruleConfigurationsByTargetPathByTargetTypeId.set(
      ruleConfiguration.targetTypeId,
      ruleConfigurationsByTargetPath,
    );
  }

  getRules(
    targetReference: UnknownTargetReference,
  ): UnknownRuleConfigurationSet {
    const ruleConfigurationsByTargetPath: RuleConfigurationsByTargetPath =
      this.ruleConfigurationsByTargetPathByTargetTypeId.get(
        targetReference.typeId,
      ) ?? (new Map() as RuleConfigurationsByTargetPath);

    const ruleConfigurationSet: UnknownRuleConfigurationSet =
      ruleConfigurationsByTargetPath.get(targetReference.path) ??
      new CustomSet();

    return ruleConfigurationSet;
  }
}
