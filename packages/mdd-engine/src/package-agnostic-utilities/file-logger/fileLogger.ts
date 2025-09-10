import fs from 'fs';
import posix from 'path';

const LOG_DIRECTORY = 'logs' as const;

/**
 * A simple logger. There are times when stdout is maintained by a parent
 * process, and so this gives an immediate place to log information to.
 */
export class FileLogger {
  constructor(public identifier: string) {
    if (identifier.includes(posix.sep) || identifier.includes('.')) {
      throw new Error(
        'Identifier must not include a path separator or extension',
      );
    }

    this.initialize();
  }

  private initialize(): void {
    fs.writeFileSync(this.relativeFilePath, '');
  }

  private get relativeFilePath(): string {
    return posix.join(LOG_DIRECTORY, this.identifier);
  }

  log(text: string): void {
    fs.appendFileSync(this.relativeFilePath, `${text}\n`);
  }
}
