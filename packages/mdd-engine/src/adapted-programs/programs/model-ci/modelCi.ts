import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import {
  EngineFunctionConfigurationStreamMetatype,
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  ENGINE_FUNCTION_CONFIGURATION_LIST,
} from '../../programmable-units/engine-program-model/engineFunctionConfiguration';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  ENGINE_PACKAGE_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { filterEngineProgramFile } from '../../programmable-units/engine-program-model/filterEngineProgramFile';
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
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program-model/getEngineProgramLocator3';
import { parseTypeScriptFileComments } from '../../programmable-units/type-script-file/parseTypeScriptFileComments';
import { getExpectedProgramTestFileConfiguration } from './getExpectedProgramTestFileConfiguration';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionCollection,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';
import { getExpectedProgramTestFile } from './getExpectedProgramTestFile';
import { assertProgramTestFileIsValid } from './assertProgramTestFileIsValid';
import { buildDefaultFileCollectionTuple } from '../../programmable-units/file/buildDefaultFileCollectionTuple';

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
          ENGINE_PACKAGE_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
        ],
      },
    ),
    new InMemoryCollection<EngineFunctionConfigurationStreamMetatype>({
      collectionId: ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: ENGINE_FUNCTION_CONFIGURATION_LIST,
    }),
    new InMemoryCollection<CiModelStreamMetatype>({
      collectionId: CI_MODEL_COLLECTION_ID,
      initialItemEggTuple: [CI_MODEL],
    }),
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    ...buildDefaultFileCollectionTuple(),
    new ProgramErrorCollection({
      programFileCache,
    }),
    new LintAssertionOmissionCollection({
      collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
      initialItemEggTuple: [NULL_OMISSION],
    }),
  ] as const),
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
