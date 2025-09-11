import { Readable } from 'stream';
import { MemoryUsageEmitter, MemoryUsageEventName } from './memoryUsageEmitter';

/**
 * A readable stream that wraps a MemoryUsageEmitter
 */
export class MemoryUsageStream extends Readable {
  constructor(private memoryUsageEmitter: MemoryUsageEmitter) {
    super();

    this.push('Listening\n');
    this.memoryUsageEmitter.on(MemoryUsageEventName.Usage, (value) => {
      this.push('---------------------------------------\n');
      this.push(`${value}\n`, 'utf8');
    });
  }

  // eslint-disable-next-line no-underscore-dangle
  _read(): void {
    // no op: the usage event handler pushes data to be read
  }
}
