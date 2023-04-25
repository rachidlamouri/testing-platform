import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { PROGRAM_ERROR_GEPP, ProgramErrorVoictent } from './programError';

// TODO: allow an estinant instance to have its own state so that this state is not shared
let errorCount = 0;

/**
 * Logs a ProgramError's id, message, and locator information to the console.
 * Note that this transform only reports the ProgramErrors, and is not
 * responsible for acting on them, such as setting the proccess exit code
 */
export const reportErrors = buildEstinant({
  name: 'reportErrors',
})
  .fromGrition<ProgramErrorVoictent>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((programError) => {
    /* eslint-disable no-console */
    console.log();
    console.log(
      `\x1b[31mError\x1b[0m ${errorCount}: ${
        programError.errorId ?? '\x1b[31mMISSING_ID\x1b[0m'
      }`,
    );
    console.log(`  Message: ${programError.message}`);
    if (programError.locator !== null) {
      console.log(`  File Path: ${programError.locator.filePath}`);
    }
    console.log();
    /* eslint-enable no-console */

    errorCount += 1;
  })
  .assemble();
