import {
  InferableTargetInstance,
  UnknownTargetInstance,
} from './targetInstance';
import { UnknownTargetPath } from './targetPath';
import { UnknownTargetTypeId } from './typedTarget';

export type UnknownRuleTypeId = string;

export type Rule<TTargetInstance extends UnknownTargetInstance> = (
  instance: TTargetInstance,
) => boolean;

export type GuardRule<
  TTargetInstance extends UnknownTargetInstance,
  TNarrowTargetInstance extends TTargetInstance,
> = (instance: TTargetInstance) => instance is TNarrowTargetInstance;

export type InferableGuardRule = GuardRule<
  InferableTargetInstance,
  InferableTargetInstance
>;

export type UnknownAppliedRuleResult = {
  ruleTypeId: UnknownRuleTypeId;
  targetTypeId: UnknownTargetTypeId;
  normalizedTargetPath: UnknownTargetPath;
  targetInstancePath: UnknownTargetPath;
  targetInstance: UnknownTargetInstance;
  isTargetValid: boolean;
};
