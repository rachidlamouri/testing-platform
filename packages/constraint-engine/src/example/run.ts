import { constraintEngine } from '../engine/constraintEngine';
import { ruleConfigurationTuple } from './ruleConfigurations';
import { targetReferenceConfigurationTuple } from './targetReferenceConfigurations';

constraintEngine.run({
  targetReferenceConfigurationTuple,
  ruleConfigurationTuple,
});
