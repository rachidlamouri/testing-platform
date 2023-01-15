import { constraintEngine } from '../engine/constraintEngine';
import { ruleConfigurations } from './ruleConfigurations';
import { targetReferenceConfigurationTuple } from './targetReferenceConfigurations';

constraintEngine.run({
  targetReferenceConfigurationTuple,
  ruleConfigurations,
});
