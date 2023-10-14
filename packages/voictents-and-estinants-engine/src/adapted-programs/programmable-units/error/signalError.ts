import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { GenericProgramErrorVoque, PROGRAM_ERROR_GEPP } from './programError';

/**
 * Sets a non-zero exit code if there is a program error.
 */
export const signalError = buildProgrammedTransform({
  name: 'signalError',
})
  .fromItem2<GenericProgramErrorVoque>({
    collectionId: PROGRAM_ERROR_GEPP,
  })
  .onTransform(() => {
    process.exitCode = 1;
  })
  .assemble();
