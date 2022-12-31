import { Rule } from '../../types/rule';
import { JsonDataType } from '../types/constants';
import { JsonTypedTargetTarget } from '../types/targets';

export const buildDataIsType = (
  expectedJsonDataType: JsonDataType,
): Rule<JsonTypedTargetTarget> => {
  const dataIsType: Rule<JsonTypedTargetTarget> = (target) => {
    return target.typeId === expectedJsonDataType;
  };

  Object.defineProperty(dataIsType, 'name', {
    value: `dataIsType:${expectedJsonDataType}`,
  });
  return dataIsType;
};
