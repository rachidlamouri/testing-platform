import { Rule } from '../../types/rule';
import { JsonDataType } from '../types/constants';
import { JsonTarget } from '../types/targets';
import { getJsonDataType } from '../utils/getJsonDataType';

export const buildDataIsType = (
  expectedJsonDataType: JsonDataType,
): Rule<JsonTarget> => {
  const dataIsType: Rule<JsonTarget> = (target) => {
    return getJsonDataType(target) === expectedJsonDataType;
  };

  Object.defineProperty(dataIsType, 'name', {
    value: `dataIsType:${expectedJsonDataType}`,
  });
  return dataIsType;
};
