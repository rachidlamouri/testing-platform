import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { PROGRAM_ERROR_GEPP, ProgramErrorVoque } from './programError';

/**
 * Sets a non-zero exit code if there is a program error.
 */
export const signalError = buildEstinant({
  name: 'signalError',
})
  .fromHubblepup2<ProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe(() => {
    process.exitCode = 1;
  })
  .assemble();
