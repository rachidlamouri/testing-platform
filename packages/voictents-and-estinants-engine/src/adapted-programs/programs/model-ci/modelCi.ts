import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import {
  EngineFunctionConfigurationStreamMetatype,
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  COLLECTIONS_AND_PROGRAMMED_TRANSFORMS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { assertCiModelHasAllPrograms } from './assertCiModelHasAllPrograms';
import { assertCiFileIsUpToDate } from './assertCiFileIsUpToDate';
import {
  CI_MODEL,
  CI_MODEL_COLLECTION_ID,
  CiModelStreamMetatype,
} from './ciModel';
import { serializeCiModel } from './serializeCiModel';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorVoictent';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program/getEngineProgramLocator3';
import { defaultFileCollectionIdCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { parseTypeScriptFileComments } from '../../programmable-units/type-script-file/parseTypeScriptFileComments';
import { getExpectedProgramTestFileConfiguration } from './getExpectedProgramTestFileConfiguration';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { assertFileExists } from '../../../layer-agnostic-utilities/assertion/assertFileExists';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionCollection,
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
runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>(
      {
        collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: [
          COLLECTIONS_AND_PROGRAMMED_TRANSFORMS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
        ],
      },
    ),
    new InMemoryCollection<EngineFunctionConfigurationStreamMetatype>({
      collectionId: ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: [
        CORE_ENGINE_FUNCTION_CONFIGURATION,
        CORE_ENGINE_FUNCTION_2_CONFIGURATION,
        ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
      ],
    }),
    new InMemoryCollection<CiModelStreamMetatype>({
      collectionId: CI_MODEL_COLLECTION_ID,
      initialItemEggTuple: [CI_MODEL],
    }),
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorCollection({
      programFileCache,
    }),
    new LintAssertionOmissionCollection({
      collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
      initialItemEggTuple: [NULL_OMISSION],
    }),
  ] as const),
  fileSystemNodeCollectionIdCombination: defaultFileCollectionIdCombination,
  programmedTransformTuple: [
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
  errorCollectionId: PROGRAM_ERROR_COLLECTION_ID,
  programFileCache,
});
