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
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { flattenAst } from './flattenAst';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionVoictent,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';
import {
  EngineFunctionConfigurationVoque,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import { filterIdentifier } from './filterIdentifier';
import { getRenameConfiguration } from './getRenameConfiguration';
import { enumerateNodeLocators } from './enumerateNodeLocators';
import { getFileRenameConfiguration } from './getFileRenameConfiguration';
import { FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP } from './fileSystemNodeRenameConfiguration';
import { RENAME_CONFIGURATION_GEPP } from './renameConfiguration';
import { getDirectoryRenameConfiguration } from './getDirectoryRenameConfiguration';

const programFileCache = new ProgramFileCache({
  namespace: 'rename-nonsense',
});

/**
 * Gathers information for renaming identifiers.
 *
 * @todo actually apply the renaming
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
    new InMemoryVoictent<EngineFunctionConfigurationVoque>({
      gepp: ENGINE_FUNCTION_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: [
        CORE_ENGINE_FUNCTION_CONFIGURATION,
        CORE_ENGINE_FUNCTION_2_CONFIGURATION,
        ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
      ],
    }),
  ] as const,
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new LintAssertionOmissionVoictent({
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

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    flattenAst,
    enumerateNodeLocators,
    filterIdentifier,

    getDirectoryRenameConfiguration,
    getFileRenameConfiguration,
    getRenameConfiguration,

    reportFailedLintAssertion,
    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  serializeeGeppList: [
    // keep this as a multi-line list for easier debugging
    RENAME_CONFIGURATION_GEPP,
    FILE_SYSTEM_NODE_RENAME_CONFIGURATION_GEPP,
  ],
  programFileCache,
});
