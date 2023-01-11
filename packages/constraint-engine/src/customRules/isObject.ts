import { ObjectTarget } from '../customTargets/testingPlatform/targets';
import { Rule } from '../types/rule';

export const isObject = ((target: unknown): target is ObjectTarget => {
  return (
    typeof target === 'object' && target !== null && !Array.isArray(target)
  );
}) satisfies Rule<unknown>;
