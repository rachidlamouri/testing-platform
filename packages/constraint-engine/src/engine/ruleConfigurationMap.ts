import {
  UnknownRuleConfiguration,
  UnknownRuleConfigurationSet,
} from '../types/ruleConfiguration';
import { UnknownTargetPath } from '../types/targetPath';
import { UnknownTargetReference } from '../types/targetReference';
import { UnknownTargetTypeId } from '../types/typedTarget';
import { CustomMap } from '../utils/customMap';
import { CustomSet } from '../utils/customSet';

export type RuleConfigurationsByTargetPath = Map<
  UnknownTargetPath,
  UnknownRuleConfigurationSet
>;

export type RuleConfigurationsByTargetPathByTargetTypeId = Map<
  UnknownTargetTypeId,
  RuleConfigurationsByTargetPath
>;

export class RuleConfigurationMap extends CustomMap<RuleConfigurationsByTargetPathByTargetTypeId> {
  setRuleConfiguration(ruleConfiguration: UnknownRuleConfiguration): void {
    const ruleConfigurationsByTargetPath: RuleConfigurationsByTargetPath =
      this.get(ruleConfiguration.targetTypeId) ??
      (new Map() as RuleConfigurationsByTargetPath);

    const ruleConfigurationList: UnknownRuleConfigurationSet =
      ruleConfigurationsByTargetPath.get(ruleConfiguration.targetPath) ??
      new CustomSet();

    ruleConfigurationList.add(ruleConfiguration);
    ruleConfigurationsByTargetPath.set(
      ruleConfiguration.targetPath,
      ruleConfigurationList,
    );
    this.set(ruleConfiguration.targetTypeId, ruleConfigurationsByTargetPath);
  }

  getRules(
    targetReference: UnknownTargetReference,
  ): UnknownRuleConfigurationSet {
    const ruleConfigurationsByTargetPath: RuleConfigurationsByTargetPath =
      this.get(targetReference.typeId) ??
      (new Map() as RuleConfigurationsByTargetPath);

    const ruleConfigurationSet: UnknownRuleConfigurationSet =
      ruleConfigurationsByTargetPath.get(targetReference.path) ??
      new CustomSet();

    return ruleConfigurationSet;
  }
}
