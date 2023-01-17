import { constraintEngine } from '../engine/constraintEngine';
import { ruleConfigurationTuple } from './ruleConfigurations';
import { modifiedTargetReferenceConfigurations } from './targetReferenceConfigurations';

constraintEngine.run({
  targetReferenceConfigurationTuple: modifiedTargetReferenceConfigurations,
  ruleConfigurationTuple,
});
