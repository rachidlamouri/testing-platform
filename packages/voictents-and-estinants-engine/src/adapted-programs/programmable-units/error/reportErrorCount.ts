import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { GenericProgramErrorVoque, PROGRAM_ERROR_GEPP } from './programError';

/**
 * Reports the size of the error collection
 */
export const reportErrorCount = buildEstinant({
  name: 'reportErrorCount',
})
  .fromVoictent2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((errorVoictent) => {
    if (errorVoictent.length > 0) {
      setImmediate(() => {
        /* eslint-disable no-console */
        console.log();
        console.log(
          `\x1b[31mTotal Error Count\x1b[0m: ${errorVoictent.length}`,
        );
        console.log();
        /* eslint-enable no-console */
      });
    }
  })
  .assemble();
