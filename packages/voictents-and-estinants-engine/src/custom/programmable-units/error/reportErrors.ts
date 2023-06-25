import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { GenericProgramErrorVoque, PROGRAM_ERROR_GEPP } from './programError';

// TODO: allow an estinant instance to have its own state so that this state is not shared
let errorCount = 0;
const errorLimit = 20;
let isLimitReached = false;

/**
 * Logs a ProgramError's id, message, and locator information to the console.
 * Note that this transform only reports the ProgramErrors, and is not
 * responsible for acting on them, such as setting the proccess exit code
 */
export const reportErrors = buildEstinant({
  name: 'reportErrors',
})
  .fromHubblepup2<GenericProgramErrorVoque>({
    gepp: PROGRAM_ERROR_GEPP,
  })
  .onPinbe((programError) => {
    errorCount += 1;

    if (errorCount < errorLimit) {
      /* eslint-disable no-console */
      console.log();
      console.log(
        `\x1b[31mError\x1b[0m ${errorCount}: ${programError.message}`,
      );
      console.log(`  Error Name    - ${programError.name}`);

      if (!(programError instanceof Error)) {
        console.log(
          `  Reporter Path - ${programError.reporterLocator.filePath}`,
        );
        if (programError.sourceLocator !== null) {
          console.log(
            `  Source Path   - ${programError.sourceLocator.filePath}`,
          );
        }
        console.log(`  Context Path  - ${programError.contextFilePath}`);
        console.log();
      }

      /* eslint-enable no-console */
    } else if (!isLimitReached) {
      // eslint-disable-next-line no-console
      console.log(
        `\x1b[31mError\x1b[0m: Additional errors were encountered and omitted from the output`,
      );

      isLimitReached = true;
    }
  })
  .assemble();
