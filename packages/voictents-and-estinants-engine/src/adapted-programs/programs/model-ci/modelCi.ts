import { InMemoryVoictent } from '../../../layer-agnostic-utilities/voictent/inMemoryVoictent';
import {
  buildVoictentByGepp,
  digikikify,
} from '../../../adapter/engine/digikikify';
import {
  EngineFunctionConfigurationVoque,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FileSystemObjectEnumeratorConfigurationVoque,
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { assertCiModelHasAllPrograms } from './assertCiModelHasAllPrograms';
import { assertCiFileIsUpToDate } from './assertCiFileIsUpToDate';
import { CI_MODEL, CI_MODEL_GEPP, CiModelVoque } from './ciModel';
import { serializeCiModel } from './serializeCiModel';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program/getEngineProgramLocator3';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { parseTypeScriptFileComments } from '../../programmable-units/type-script-file/parseTypeScriptFileComments';
import { getExpectedProgramTestFileConfiguration } from './getExpectedProgramTestFileConfiguration';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { assertFileExists } from '../../../layer-agnostic-utilities/assertion/assertFileExists';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionVoictent,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';
import { getExpectedProgramTestFile } from './getExpectedProgramTestFile';
import { assertProgramTestFileIsValid } from './assertProgramTestFileIsValid';

const programFileCache = new ProgramFileCache({
  namespace: 'modelCi',
});

/**
 * Uses a hard-coded data structure that represents the information in CI.sh and
 * then makes sure the data structure and bash file are sound
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
    new InMemoryVoictent<CiModelVoque>({
      gepp: CI_MODEL_GEPP,
      initialHubblepupPelueTuple: [CI_MODEL],
    }),
  ] as const,
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new LintAssertionOmissionVoictent({
      gepp: LINT_ASSERTION_OMISSION_GEPP,
      initialHubblepupPelueTuple: [NULL_OMISSION],
    }),
  ] as const),
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    parseTypeScriptFileComments,
    getTypeScriptFileImportList,
    getCommentedProgramBodyDeclarationList,

    filterEngineProgramFile,
    getEngineProgramLocator3,

    getExpectedProgramTestFileConfiguration,
    getExpectedProgramTestFile,
    assertProgramTestFileIsValid,

    serializeCiModel,

    assertFileExists,
    assertCiFileIsUpToDate,
    assertCiModelHasAllPrograms,

    reportFailedLintAssertion,
    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  errorGepp: PROGRAM_ERROR_GEPP,
  programFileCache,
});
