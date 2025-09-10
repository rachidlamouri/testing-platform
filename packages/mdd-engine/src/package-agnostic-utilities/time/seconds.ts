import { LogicalComparisonOperator } from '../logical-comparison/logicalComparisonOperator';
import { TimeMeasurement } from './timeMeasurement';
import { compareTime } from './compareTime';

/**
 * Guarantees that seconds are measured as a float
 */
export class Seconds implements TimeMeasurement<'Seconds', number> {
  $distinguisher = 'Seconds' as const;

  constructor(public value: number) {}

  compare(operator: LogicalComparisonOperator, rightTerm: Seconds): boolean {
    return compareTime(this, operator, rightTerm);
  }
}
