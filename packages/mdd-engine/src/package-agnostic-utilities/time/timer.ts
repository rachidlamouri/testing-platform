import { Nanoseconds } from './nanoseconds';
import { Seconds } from './seconds';
import { getCurrentTimeInNanoseconds } from './getCurrentTimeInNanoseconds';
import { assertNotNull } from '../nil/assertNotNull';
import { Milliseconds } from './milliseconds';
import { convertNanosecondsToMilliseconds } from './convertNanosecondsToMilliseconds';
import { convertNanosecondsToSeconds } from './convertNanosecondsToSeconds';

/**
 * Measures elapsed time since the last time "restart" was called
 */
export class Timer {
  private startTime: Nanoseconds | null = null;

  restart(): void {
    this.startTime = getCurrentTimeInNanoseconds();
  }

  get elapsedSeconds(): Seconds {
    const result = convertNanosecondsToSeconds(this.elapsedNanoseconds);
    return result;
  }

  get elapsedMilliseconds(): Milliseconds {
    const result = convertNanosecondsToMilliseconds(this.elapsedNanoseconds);
    return result;
  }

  get elapsedNanoseconds(): Nanoseconds {
    assertNotNull(this.startTime);

    const currentTime = getCurrentTimeInNanoseconds();
    const result = new Nanoseconds(currentTime.value - this.startTime.value);

    return result;
  }
}
