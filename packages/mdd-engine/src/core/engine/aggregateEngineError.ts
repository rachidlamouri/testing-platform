/**
 * Enables throwing a single error for multiple simultaneous errors.
 * "Aggregate" here is not a verb
 */
export class AggregateEngineError extends Error {
  constructor(errorList: (string | Error)[]) {
    const stackTraceList = errorList.map((value) => {
      if (typeof value === 'string') {
        return value;
      }

      return value.stack ?? 'NO STACK TRACE';
    });

    const aggregateMessage = [
      `Encountered ${errorList.length} errors:`,
      ...stackTraceList.slice(0, 100).map((stackTrace, index) => {
        const [firstLine, ...otherLineList] = stackTrace.split('\n');

        const truncatedOtherLineList = otherLineList.slice(0, 19);

        const messageSegmentLineList = [
          // 4 accounts for 2 spaces and then a 2 digit number
          `${`${index}`.padStart(4, ' ')}: ${firstLine}`,
          ...truncatedOtherLineList.map((line) => `        ${line}`),
        ];

        const lineDifference =
          otherLineList.length - truncatedOtherLineList.length;

        if (lineDifference > 0) {
          messageSegmentLineList.push(`        +${lineDifference} more lines`);
        }

        const messageSegment = messageSegmentLineList.join('\n');
        return messageSegment;
      }),
    ].join('\n');

    super(aggregateMessage);
  }
}
