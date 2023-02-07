import { WortinatorEstinant } from '../../core/estinant';
import { TropoignantTypeName } from '../../core/tropoignant';
import { digikikifierGeppsByIdentifer } from '../../core/yek';
import { logger } from '../../utilities/logger';
import {
  ValidationResultOdeshin,
  VALIDATION_RESULT_GEPP,
} from './validationResult';

let totalValidationCount = 0;
const errorMessages: string[] = [];
const validationAggregator: WortinatorEstinant<ValidationResultOdeshin> = {
  inputGepp: VALIDATION_RESULT_GEPP,
  tropoignant: {
    typeName: TropoignantTypeName.Wortinator,
    process: function onValidationResult(inputOdeshin) {
      totalValidationCount += 1;

      if (!inputOdeshin.grition.isValid) {
        errorMessages.push(
          `"${inputOdeshin.grition.identifier}" does not satisfy "${inputOdeshin.grition.predicate}"`,
        );
      }
    },
  },
};

const serializeValidationResults = (): string => {
  const failedValidationCount = errorMessages.length;
  const successfulValidationCount =
    totalValidationCount - failedValidationCount;

  const lines: string[] = [
    '',
    `Successful validation count: ${successfulValidationCount}`,
    `Failed     validation count: ${failedValidationCount}`,
    '',
    ...errorMessages.flatMap((errorMessage, index) => {
      return [`Failure: ${index}`, errorMessage, ''].map(
        (line) => `    ${line}`,
      );
    }),
  ];

  return lines.join('\n');
};

const validatorExecutor: WortinatorEstinant<null> = {
  inputGepp: digikikifierGeppsByIdentifer.OnFinish,
  tropoignant: {
    typeName: TropoignantTypeName.Wortinator,
    process: function executeValidation() {
      logger.feedLine();

      const text = serializeValidationResults();
      logger.logText(text);

      process.exit(errorMessages.length === 0 ? 0 : 1);
    },
  },
};

export const validator = {
  validatorStreamer: validationAggregator,
  validatorExecutor,
};
