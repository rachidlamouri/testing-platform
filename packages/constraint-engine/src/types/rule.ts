import { UnknownTargetInstance } from './targetInstance';
import { UnknownTargetPath } from './targetPath';
import { UnknownTargetTypeId } from './typedTarget';

export type UnknownRuleTypeId = string;

export type Rule<TTargetInstance extends UnknownTargetInstance> = (
  instance: TTargetInstance,
) => boolean;

export type UnknownNormalizedAppliedRuleResult = {
  ruleTypeId: UnknownRuleTypeId;
  targetTypeId: UnknownTargetTypeId;
  normalizedTargetPath: UnknownTargetPath;
  targetInstancePath: UnknownTargetPath;
  isTargetValid: boolean;
};
