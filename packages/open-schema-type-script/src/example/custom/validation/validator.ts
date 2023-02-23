import {
  digikikifierGeppsByIdentifer,
  DigikikifierOnFinishEventQuirm,
} from '../../../core/yek';
import {
  buildWortinatorHamletive,
  Haqueler,
} from '../../../type-script-adapter/hamletive/wortinator';
import { logger } from '../../../utilities/logger';
import {
  ValidationResultQuirm,
  VALIDATION_RESULT_GEPP,
} from './validationResult';

let totalValidationCount = 0;
const errorMessages: string[] = [];

const onValidationResult: Haqueler<ValidationResultQuirm> = (input) => {
  totalValidationCount += 1;

  if (!input.hubblepup.grition.isValid) {
    errorMessages.push(
      `"${input.hubblepup.grition.identifier}" does not satisfy "${input.hubblepup.grition.predicate}"`,
    );
  }
};

export const validationAggregator =
  buildWortinatorHamletive<ValidationResultQuirm>({
    inputGepp: VALIDATION_RESULT_GEPP,
    haquel: onValidationResult,
  });

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

const executeValidation: Haqueler<DigikikifierOnFinishEventQuirm> = () => {
  logger.feedLine();

  const text = serializeValidationResults();
  logger.logText(text);

  process.exit(errorMessages.length === 0 ? 0 : 1);
};

export const validatorExecutor =
  buildWortinatorHamletive<DigikikifierOnFinishEventQuirm>({
    inputGepp: digikikifierGeppsByIdentifer.OnFinish,
    haquel: executeValidation,
  });

// TODO: remove this
export type Validator = symbol;
