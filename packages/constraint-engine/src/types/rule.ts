import {
  InferableTargetInstance,
  UnknownTargetInstance,
} from './targetInstance';
import { UnknownTargetReference } from './targetReference';

export type UnknownRuleTypeId = string;

export type Rule<TTargetInstance extends UnknownTargetInstance> = (
  instance: TTargetInstance,
) => boolean;

export type GuardRule<
  TTargetInstance extends UnknownTargetInstance,
  TNarrowTargetInstance extends TTargetInstance,
> = (instance: TTargetInstance) => instance is TNarrowTargetInstance;

export type InferableGuardRule<TTargetInstance extends UnknownTargetInstance> =
  GuardRule<TTargetInstance, InferableTargetInstance>;

export type UnknownAppliedRuleResult = {
  ruleTypeId: UnknownRuleTypeId;
  targetReference: UnknownTargetReference;
  isTargetValid: boolean;
};
