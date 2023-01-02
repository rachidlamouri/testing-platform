import { Rule } from '../../types/rule';
import { JsonObjectTarget } from '../types/targets';

export const buildObjectHasRequiredProperties = (
  expectedRequiredProperties: string[],
): Rule<JsonObjectTarget> => {
  const objectHasRequiredProperties: Rule<JsonObjectTarget> = (target) => {
    return expectedRequiredProperties.every((p) => p in target);
  };

  return objectHasRequiredProperties;
};
