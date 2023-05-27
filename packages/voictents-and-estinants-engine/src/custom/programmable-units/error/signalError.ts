import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import {
  GenericProgramError2Voque,
  PROGRAM_ERROR_2_GEPP,
} from './programError2';

/**
 * Sets a non-zero exit code if there is a program error.
 */
export const signalError = buildEstinant({
  name: 'signalError',
})
  .fromHubblepup2<GenericProgramError2Voque>({
    gepp: PROGRAM_ERROR_2_GEPP,
  })
  .onPinbe(() => {
    process.exitCode = 1;
  })
  .assemble();
