import { buildProgrammedTransform } from '../../../adapter/estinant-builder/buildEstinant';
import { GenericProgramErrorVoque, PROGRAM_ERROR_GEPP } from './programError';

/**
 * Reports the size of the error collection
 */
export const reportErrorCount = buildProgrammedTransform({
  name: 'reportErrorCount',
})
  .fromVoictent2<GenericProgramErrorVoque>({
    collectionId: PROGRAM_ERROR_GEPP,
  })
  .onTransform((errorVoictent) => {
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
