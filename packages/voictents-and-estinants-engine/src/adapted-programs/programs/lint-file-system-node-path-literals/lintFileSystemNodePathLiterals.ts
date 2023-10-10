import {
  digikikify,
  buildVoictentByGepp,
} from '../../../adapter/engine/digikikify';
import { InMemoryVoictent } from '../../../layer-agnostic-utilities/voictent/inMemoryVoictent';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
  FileSystemObjectEnumeratorConfigurationVoque,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { signalError } from '../../programmable-units/error/signalError';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { assertFileExtensionIsKnown } from '../categorize-files/assertFileExtensionIsKnown';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { enumerateNodeLocators } from '../rename-nonsense/enumerateNodeLocators';
import { flattenAst } from '../rename-nonsense/flattenAst';
import { filterStringLiteral } from './filterStringLiteral';
import { filterFilePathLikeStringLiteral } from './filterFilePathLikeStringLiteral';
import { assertFileSystemNodePathLiteralExists } from './assertFileSystemNodePathLiteralExists';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionVoictent,
  LintAssertionOmissionVoque,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';

const programFileCache = new ProgramFileCache({
  namespace: 'lint-file-system-node-path-literals',
});

/**
 * Looks for string literals that look like they reference file system node paths, and then checks if the reference path exists on disk.
 *
 * @canonicalComment
 */
digikikify({
  explicitVoictentTuple: [
    new InMemoryVoictent<FileSystemObjectEnumeratorConfigurationVoque>({
      gepp: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [
        VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
  ] as const,
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new LintAssertionOmissionVoictent<LintAssertionOmissionVoque>({
      gepp: LINT_ASSERTION_OMISSION_GEPP,
      initialHubblepupPelueTuple: [
        // keep multiline
        NULL_OMISSION,
      ],
    }),
  ] as const),
  errorGepp: PROGRAM_ERROR_GEPP,
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    assertFileExtensionIsKnown,
    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    flattenAst,
    enumerateNodeLocators,
    filterStringLiteral,
    filterFilePathLikeStringLiteral,

    assertFileSystemNodePathLiteralExists,

    reportFailedLintAssertion,
    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  serializeeGeppList: [
    // keep this as a multi-line list for easier debugging
  ],
  programFileCache,
});
