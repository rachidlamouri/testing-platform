import EventEmitter from 'events';
import { execSync } from 'child_process';
import { Timer } from '../time/timer';
import { ByteCount } from '../byte/byteCount';
import { byteFormatter } from '../byte/byteFormatter';
import { Milliseconds } from '../time/milliseconds';
import { convertBigIntegerToNumber } from '../number/convertBigIntegerToNumber';
import { convertMillisecondsToSeconds } from '../time/convertMillisecondsToSeconds';
import { isNotNull } from '../nil/isNotNull';
import { bytes } from '../byte/bytes';
import { formatTable } from '../table-formatter/formatTable';

type ByteCountEntry = readonly [label: string, byteCount: ByteCount];

type MemoryUsageHandler = (formattedUsage: string) => void;

type MemoryLimitReachedHandler = (
  formattedUsage: string,
  formattedLimit: string,
) => void;

export enum MemoryUsageEventName {
  Usage = 'Usage',
  LimitReached = 'LimitReached',
}

/**
 * Event emitter for reporting memory usage on an interval, and also reporting
 * if the usage has exceeded a given threshold.
 *
 * @canonicalComment
 */
export class MemoryUsageEmitter extends EventEmitter {
  static POLLING_RATE_MILLISECONDS = new Milliseconds(500n);

  static POLLING_RATE_SECONDS = convertMillisecondsToSeconds(
    MemoryUsageEmitter.POLLING_RATE_MILLISECONDS,
  );

  static REPORTING_RATE_MILLISECONDS = new Milliseconds(5000n);

  static REPORTING_RATE_SECONDS = convertMillisecondsToSeconds(
    MemoryUsageEmitter.REPORTING_RATE_MILLISECONDS,
  );

  private hasStarted = false;

  private timer = new Timer();

  private subprocessIdList = new Set<number>();

  constructor(public readonly inclusiveLimit: ByteCount) {
    super();
  }

  on(eventName: MemoryUsageEventName.Usage, listener: MemoryUsageHandler): this;
  on(
    eventName: MemoryUsageEventName.LimitReached,
    listener: MemoryLimitReachedHandler,
  ): this;
  on(
    eventName: MemoryUsageEventName,
    listener: MemoryUsageHandler | MemoryLimitReachedHandler,
  ): this {
    return super.on(eventName, listener);
  }

  emit(): never {
    throw new Error('Call "start" to start emitting memoryUsage events.');
  }

  private emitEvent(
    eventName: MemoryUsageEventName.Usage,
    formattedUsage: string,
  ): void;
  private emitEvent(
    eventName: MemoryUsageEventName.LimitReached,
    formattedUsage: string,
    inclusiveLimit: string,
  ): void;
  private emitEvent(eventName: MemoryUsageEventName, ...data: unknown[]): void {
    super.emit(eventName, ...data);
  }

  watchSubprocess(processId: number): void {
    this.subprocessIdList.add(processId);
  }

  get parentProcessMemoryUsage(): ByteCount {
    return new ByteCount(
      process.memoryUsage().rss + process.memoryUsage().heapUsed,
    );
  }

  get subprocessMemoryUsage(): ByteCountEntry[] {
    if (this.subprocessIdList.size === 0) {
      return [];
    }

    const textResult = execSync(
      `ps -o pid,rss -p ${[...this.subprocessIdList].join(' ')}`,
      {
        encoding: 'utf-8',
      },
    );

    const entries = textResult
      .split('\n')
      .map((line) => {
        return line.match(/^\d+ \d+$/);
      })
      .filter(isNotNull)
      .map((match) => {
        const [processId, memoryText] = match[0].split(' ');

        const byteCount = bytes`${memoryText}KB`;
        return [processId, byteCount] as const;
      });

    return entries;
  }

  start(): void {
    if (this.hasStarted) {
      return;
    }

    this.timer.restart();

    const onInterval = (): void => {
      const { parentProcessMemoryUsage, subprocessMemoryUsage } = this;

      const individualEntries: ByteCountEntry[] = [
        ['Parent', parentProcessMemoryUsage],
        ...subprocessMemoryUsage,
      ];

      let totalUsage = 0;
      individualEntries.forEach((entry) => {
        const usage = entry[1];
        totalUsage += usage.value;
      });
      const totalByteCount = new ByteCount(totalUsage);

      const outputEntries: ByteCountEntry[] = [
        ['Total', totalByteCount],
        ...individualEntries,
      ];

      const formattedOutput = formatTable([
        ['Label', 'Size'],
        ...outputEntries.map(([label, byteCount]) => {
          return [label, byteFormatter.format(byteCount).padStart(7, ' ')];
        }),
      ]);

      if (
        this.timer.elapsedSeconds.compare(
          '>=',
          MemoryUsageEmitter.REPORTING_RATE_SECONDS,
        )
      ) {
        this.emitEvent(MemoryUsageEventName.Usage, formattedOutput);
        this.timer.restart();
      }

      if (totalByteCount.value > this.inclusiveLimit.value) {
        this.emitEvent(
          MemoryUsageEventName.LimitReached,
          formattedOutput,
          byteFormatter.format(this.inclusiveLimit),
        );
      }
    };

    onInterval();
    setInterval(
      onInterval,
      convertBigIntegerToNumber(
        MemoryUsageEmitter.POLLING_RATE_MILLISECONDS.value,
      ),
    );

    this.hasStarted = true;
  }
}
