import { constraintEngine } from '../engine/constraintEngine';
import { ruleConfigurationTuple } from './ruleConfigurationTuple';
import { modifiedTargetReferenceConfigurations } from './targetReferenceConfigurationTuple';

constraintEngine.run({
  targetReferenceConfigurationTuple: modifiedTargetReferenceConfigurations,
  ruleConfigurationTuple,
});
