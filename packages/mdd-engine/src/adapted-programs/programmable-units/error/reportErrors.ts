import { serialize } from '../../../package-agnostic-utilities/one-way-serializer/serialize';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { LintAssertionError } from '../linting/reportFailedLintAssertion';
import {
  GenericProgramErrorStreamMetatype,
  PROGRAM_ERROR_COLLECTION_ID,
} from './programError';
import { LocatableError } from './locatableError';
import { Source } from '../linting/source/source';

// TODO: allow a programmed transform instance to have its own state so that this state is not shared
let errorCount = 0;
const errorLimit = 5;
let isLimitReached = false;

/* eslint-disable no-console */
const serializeSource = (source: Source): void => {
  if ('serialized' in source) {
    console.log(`    ${source.serialized}`);
  } else {
    console.log(
      serialize(source.id.templateValueByKeyPath)
        .split('\n')
        .map((line) => `    ${line}`)
        .join('\n'),
    );
  }
};

/**
 * Logs a ProgramError's id, message, and locator information to the console.
 * Note that this transform only reports the ProgramErrors, and is not
 * responsible for acting on them, such as setting the proccess exit code
 */
export const reportErrors = buildProgrammedTransform({
  name: 'reportErrors',
})
  .fromItem2<GenericProgramErrorStreamMetatype>({
    collectionId: PROGRAM_ERROR_COLLECTION_ID,
  })
  .onTransform((programError) => {
    errorCount += 1;

    // TODO: Update programError to always be an instance of Error

    // TODO: create an abstract subclass of Error that requires a function that serializes metadata including program file cache file paths

    if (errorCount <= errorLimit) {
      console.log();
      console.log(
        `\x1b[31mError\x1b[0m ${errorCount}: ${programError.message}`,
      );

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
      } else if (programError instanceof LocatableError) {
        console.log('  Reporter Source');
        serializeSource(programError.reporterSource);
        console.log('  Error Source');
        serializeSource(programError.errorSource);
        const contextPath = programError.contextFilePath ?? 'n/a';

        console.log('  Context Path');
        console.log(`    ${contextPath}`);
      } else if (programError instanceof LintAssertionError) {
        const { lintAssertion } = programError;

        console.log('  Rule Name');
        console.log(`    ${lintAssertion.rule.name}`);
        console.log('  Rule Source');
        serializeSource(lintAssertion.rule.source);

        console.log('  Lint Source');
        serializeSource(lintAssertion.lintSource);

        const contextPath = programError.contextFilePath ?? 'n/a';

        console.log('  Context Path');
        console.log(`    ${contextPath}`);

        // TODO: incorporate the program file cache error context filepath
      }

      /* eslint-enable no-console */
    } else if (!isLimitReached) {
      // eslint-disable-next-line no-console
      console.log();
      // eslint-disable-next-line no-console
      console.log(
        `\x1b[31mError\x1b[0m: Additional errors were encountered and omitted from the output`,
      );

      isLimitReached = true;
    }
  })
  .assemble();
