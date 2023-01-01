import { constraintEngine } from '../engine/constraintEngine';
import { ruleConfigurations } from './ruleConfigurations';
import { targetReferenceConfigurations } from './targetReferenceConfigurations';

constraintEngine.run({
  targetReferenceConfigurations,
  ruleConfigurations,
});
