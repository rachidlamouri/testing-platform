import { Rule } from '../types/rule';

export const listIsNotEmpty: Rule<unknown[]> = (target) => target.length > 0;
