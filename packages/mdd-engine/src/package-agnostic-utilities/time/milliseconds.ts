import { Integer } from '../integer/integer';
import { LogicalComparisonOperator } from '../logical-comparison/logicalComparisonOperator';
import { compareTime } from './compareTime';
import { TimeMeasurement } from './timeMeasurement';

/**
 * Guarantees that a mesasurement in milliseconds is an integer
 */
export class Milliseconds
  extends Integer<bigint>
  implements TimeMeasurement<'Milliseconds', bigint>
{
  $distinguisher = 'Milliseconds' as const;

  compare(
    operator: LogicalComparisonOperator,
    rightTerm: Milliseconds,
  ): boolean {
    return compareTime(this, operator, rightTerm);
  }
}
