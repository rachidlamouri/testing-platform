import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { ERROR_GEPP, ErrorVoictent } from './error';

// TODO: allow an estinant instance to have its own state so that this state is not shared
let errorCount = 0;

export const reportErrors = buildEstinant({
  name: 'reportErrors',
})
  .fromHubblepup<ErrorVoictent>({
    gepp: ERROR_GEPP,
  })
  .onPinbe((input) => {
    /* eslint-disable no-console */
    console.log();
    console.log(`Error ${errorCount}:`);
    console.log(input.zorn);
    console.log();
    /* eslint-enable no-console */

    errorCount += 1;
  })
  .assemble();
