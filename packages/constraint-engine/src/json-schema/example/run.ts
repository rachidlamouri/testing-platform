import { constraintEngine } from '../../engine/constraintEngine';
import { getTargetReferenceConfigurationsFromJson } from '../utils/getTargetReferenceConfigurationsFromData';
import { getRuleConfigurationsFromJsonSchema } from '../utils/getRuleConfigurationsFromJsonSchema';
import { JsonTarget } from '../types/targets';

const inputData: JsonTarget = 'hello!';

const inputSchema: JsonTarget = {
  type: 'boolean',
};

const targetReferenceConfigurations =
  getTargetReferenceConfigurationsFromJson(inputData);

const ruleConfigurations = getRuleConfigurationsFromJsonSchema(inputSchema);

constraintEngine.run({
  targetReferenceConfigurations,
  ruleConfigurations,
});
