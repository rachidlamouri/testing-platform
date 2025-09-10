import { Distinguisher } from '../class/distinguishable';
import { LogicalComparisonOperator } from '../logical-comparison/logicalComparisonOperator';
import { TimeMeasurement, TimeValue } from './timeMeasurement';

/**
 * General function for comparing two times from the same class, which preserves
 * the semantics of the input and output time units.
 */
export const compareTime = <
  TDistinguisher extends Distinguisher,
  TTimeValue extends TimeValue,
>(
  leftTerm: TimeMeasurement<TDistinguisher, TTimeValue>,
  operator: LogicalComparisonOperator,
  rightTerm: TimeMeasurement<TDistinguisher, TTimeValue>,
): boolean => {
  switch (operator) {
    case '===': {
      return leftTerm.value === rightTerm.value;
    }
    case '!==': {
      return leftTerm.value !== rightTerm.value;
    }
    case '>': {
      return leftTerm.value > rightTerm.value;
    }
    case '>=': {
      return leftTerm.value >= rightTerm.value;
    }
    case '<': {
      return leftTerm.value < rightTerm.value;
    }
    case '<=': {
      return leftTerm.value <= rightTerm.value;
    }
  }

  throw new Error('Unreachable');
};
