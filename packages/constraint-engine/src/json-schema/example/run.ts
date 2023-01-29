import { constraintEngine } from '../../engine/constraintEngine';
import { getTargetReferenceConfigurationTupleFromJson } from '../utils/getTargetReferenceConfigurationTupleFromJson';
import { getRuleConfigurationTupleFromJsonSchema } from '../utils/getRuleConfigurationTupleFromJsonSchema';
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
