import { constraintEngine } from '../../engine/constraintEngine';
import { getTargetReferenceConfigurationTupleFromJson } from '../utils/getTargetReferenceConfigurationsFromData';
import { getRuleConfigurationTupleFromJsonSchema } from '../utils/getRuleConfigurationsFromJsonSchema';
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

const targetReferenceConfigurationTuple =
  getTargetReferenceConfigurationTupleFromJson(inputInstance);

const ruleConfigurationTuple =
  getRuleConfigurationTupleFromJsonSchema(inputSchema);

constraintEngine.run({
  targetReferenceConfigurationTuple,
  ruleConfigurationTuple,
});
