import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from './programError';

/**
 * Sets a non-zero exit code if there is a program error.
 */
export const signalError = buildProgrammedTransform({
  name: 'signalError',
})
  .fromItem2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform(() => {
    process.exitCode = 1;
  })
  .assemble();
