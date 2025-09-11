import { Integer } from '../integer/integer';
import { LogicalComparisonOperator } from '../logical-comparison/logicalComparisonOperator';
import { compareTime } from './compareTime';
import { TimeMeasurement } from './timeMeasurement';

/**
 * Guarantees that a mesasurement in nanoseconds is an integer
 */
export class Nanoseconds
  extends Integer<bigint>
  implements TimeMeasurement<'Nanoseconds', bigint>
{
  $distinguisher = 'Nanoseconds' as const;

  compare(
    operator: LogicalComparisonOperator,
    rightTerm: Nanoseconds,
  ): boolean {
    return compareTime(this, operator, rightTerm);
  }
}
