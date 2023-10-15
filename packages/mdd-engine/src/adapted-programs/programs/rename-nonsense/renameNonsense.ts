import {
  runEngine,
  buildCollectionByCollectionId,
} from '../../../adapter/engine/runEngine';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  COLLECTIONS_AND_PROGRAMMED_TRANSFORMS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { defaultFileCollectionIdCombination } from '../../programmable-units/file/defaultFileCollectionIdCombination';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
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
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionCollection,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';
import {
  EngineFunctionConfigurationStreamMetatype,
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import { filterIdentifier } from './filterIdentifier';
import { getRenameConfiguration } from './getRenameConfiguration';
import { enumerateNodeLocators } from './enumerateNodeLocators';
import { getFileRenameConfiguration } from './getFileRenameConfiguration';
import { getDirectoryRenameConfiguration } from './getDirectoryRenameConfiguration';
import { applyRenaming } from './applyRenaming';

const programFileCache = new ProgramFileCache({
  namespace: 'rename-nonsense',
});

/**
 * Gathers information for renaming identifiers.
 *
 * @note this program will not apply any renaming unless the env var ENABLE_WRITE is set
 *
 * @todo actually apply the renaming
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
  ] as const,
  fileSystemNodeCollectionIdCombination: defaultFileCollectionIdCombination,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorCollection({
      programFileCache,
    }),
    new LintAssertionOmissionCollection({
      collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
      initialItemEggTuple: [
        // keep multiline
        NULL_OMISSION,
      ],
    }),
  ] as const),
  errorCollectionId: PROGRAM_ERROR_COLLECTION_ID,
  programmedTransformTuple: [
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

    applyRenaming,

    reportFailedLintAssertion,
    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  serializeeCollectionIdList: [
    // keep this as a multi-line list for easier debugging
  ],
  programFileCache,
});
