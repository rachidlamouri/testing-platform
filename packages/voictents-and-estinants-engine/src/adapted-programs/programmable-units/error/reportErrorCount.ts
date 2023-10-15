import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from './programError';

/**
 * Reports the size of the error collection
 */
export const reportErrorCount = buildProgrammedTransform({
  name: 'reportErrorCount',
})
  .fromCollection2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((errorCollection) => {
    if (errorCollection.length > 0) {
      setImmediate(() => {
        /* eslint-disable no-console */
        console.log();
        console.log(
          `\x1b[31mTotal Error Count\x1b[0m: ${errorCollection.length}`,
        );
        console.log();
        /* eslint-enable no-console */
      });
    }
  })
  .assemble();
