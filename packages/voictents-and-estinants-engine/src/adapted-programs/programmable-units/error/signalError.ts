import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { GenericProgramErrorVoque, PROGRAM_ERROR_GEPP } from './programError';

/**
 * Sets a non-zero exit code if there is a program error.
 */
export const signalError = buildEstinant({
  name: 'signalError',
})
  .fromHubblepup2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe(() => {
    process.exitCode = 1;
  })
  .assemble();
