import { Source } from '../linting/source/source';

type LocatableErrorInput = {
  message: string;
  reporterSource: Source;
  errorSource: Source;
  context: unknown;
};

/**
 * An error with a reporterSource (the entity that threw the error) and an
 * errorSource (the entity that caused the error)
 */
export class LocatableError extends Error {
  // TODO: this is being used in a hacky way. Maybe apply it as an interface?
  contextFilePath?: string;

  reporterSource: Source;

  errorSource: Source;

  context: unknown;

  constructor(input: LocatableErrorInput) {
    super(input.message);

    this.reporterSource = input.reporterSource;
    this.errorSource = input.errorSource;
    this.context = input.context;
  }

  setContextFilePath(filePath: string): void {
    this.contextFilePath = filePath;
  }
}
