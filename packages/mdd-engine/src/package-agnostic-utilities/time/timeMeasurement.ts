import { Distinguishable, Distinguisher } from '../class/distinguishable';
import { LogicalComparisonOperator } from '../logical-comparison/logicalComparisonOperator';
import { Simplify } from '../type/simplify';

export type TimeValue = number | bigint;

/**
 * Interface for distinguishable units of time. Should be implemented by classes
 * like Seconds and Nanoseconds
 */
export type TimeMeasurement<
  TDistinguisher extends Distinguisher,
  TTimeValue extends TimeValue,
> = Simplify<
  Distinguishable<TDistinguisher>,
  {
    value: TTimeValue;
    compare(
      operator: LogicalComparisonOperator,
      rightTerm: TimeMeasurement<TDistinguisher, TTimeValue>,
    ): boolean;
  }
>;
