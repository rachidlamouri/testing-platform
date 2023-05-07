import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { PROGRAM_ERROR_GEPP, ProgramErrorVoictent } from './programError';

export const signalError = buildEstinant({
  name: 'signalError',
})
  .fromHubblepup<ProgramErrorVoictent>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe(() => {
    process.exitCode = 1;
  })
  .assemble();
