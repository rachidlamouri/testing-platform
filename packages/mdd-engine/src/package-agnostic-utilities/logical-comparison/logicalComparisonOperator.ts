const LOGICAL_COMPARISON_OPERATOR_SET = [
  '===',
  '!==',
  '>',
  '>=',
  '<',
  '<=',
] as const;

type LogicalComparisonOperatorSet = typeof LOGICAL_COMPARISON_OPERATOR_SET;

/**
 * Strings representing the basic JavaScript logical comparison operators
 * (equality, inequality, ...etc). These are used by classes to implement a
 * "compare" function against an instance of the same type.
 */
export type LogicalComparisonOperator = LogicalComparisonOperatorSet[number];
