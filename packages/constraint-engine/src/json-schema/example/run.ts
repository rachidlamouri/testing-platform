import { constraintEngine } from '../../engine/constraintEngine';
import { getTargetReferenceConfigurationsFromJson } from '../utils/getTargetReferenceConfigurationsFromData';
import { getRuleConfigurationsFromJsonSchema } from '../utils/getRuleConfigurationsFromJsonSchema';
import { JsonTarget } from '../types/targets';

const inputInstance: JsonTarget = {
  potato: 'foo',
  tomato: 'bar',
  something: 'abc',
};

const inputSchema: JsonTarget = {
  type: 'object',
  required: ['potato', 'tomato'],
};

const targetReferenceConfigurations =
  getTargetReferenceConfigurationsFromJson(inputInstance);

const ruleConfigurations = getRuleConfigurationsFromJsonSchema(inputSchema);

constraintEngine.run({
  targetReferenceConfigurations,
  ruleConfigurations,
});
