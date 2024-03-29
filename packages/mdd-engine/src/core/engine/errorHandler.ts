import { assertIsError } from '../../package-agnostic-utilities/error/assertIsError';
import { GenericCollection2 } from '../types/collection/collection2';
import { AggregateEngineError } from './aggregateEngineError';

type ErrorEvent = {
  error: Error;
  isCritical: boolean;
};

type ErrorHandlerInput = {
  errorCollection: GenericCollection2 | null;
};

/**
 * Encapsulates engine error handling including checking if an error collection
 * exists, and failing fast when the engine encounters a critical error
 */
export class ErrorHandler {
  encounteredError = false;

  errorCollection: GenericCollection2 | null;

  constructor(input: ErrorHandlerInput) {
    this.errorCollection = input.errorCollection ?? null;
  }

  onError(event: ErrorEvent): void {
    const { error, isCritical } = event;

    this.encounteredError = true;

    if (this.errorCollection === null) {
      throw new AggregateEngineError([
        'The engine encountered an error, but no error collection was specified',
        error.message,
      ]);
    }

    try {
      this.errorCollection.addItem(error);
    } catch (secondError) {
      assertIsError(secondError);
      throw new AggregateEngineError([
        `The engine encountered a critical error. The error collection "${this.errorCollection.collectionId}" threw an error while handling an error`,
        error.message,
        secondError.message,
      ]);
    }

    if (isCritical) {
      throw new Error(
        `The engine encountered a critical error. See the error collection with collection id "${this.errorCollection.collectionId}" for more details`,
      );
    }
  }
}
