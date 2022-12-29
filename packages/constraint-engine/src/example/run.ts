import { constraintEngine } from '../engine/constraintEngine';
import { UnknownRuleConfiguration } from '../types/ruleConfiguration';
import { UnknownTargetReferenceConfiguration } from '../types/targetReferenceConfiguration/unknownTargetReferenceConfiguration';
import { ruleConfigurations } from './ruleConfigurations';
import { targetReferenceConfigurations } from './targetReferenceConfigurations';

constraintEngine.run({
  targetReferenceConfigurations:
    targetReferenceConfigurations as unknown as UnknownTargetReferenceConfiguration[],
  ruleConfigurations:
    ruleConfigurations as unknown as UnknownRuleConfiguration[],
});
