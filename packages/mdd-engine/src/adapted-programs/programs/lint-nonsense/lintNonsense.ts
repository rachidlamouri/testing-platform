import {
  runEngine,
  buildCollectionByCollectionId,
} from '../../../adapter/engine/runEngine';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  ENGINE_PACKAGE_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { signalError } from '../../programmable-units/error/signalError';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program-model/getEngineProgramLocator3';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import { filterEngineProgramFile } from '../../programmable-units/engine-program-model/filterEngineProgramFile';
import { assertTypeScriptFileHasCanonicalComment } from '../../programmable-units/type-script-file/assertTypeScriptFileHasCanonicalComment';
import { assertTypeScriptFileHasSensibleName } from '../../programmable-units/type-script-file/assertTypeScriptFileHasSensibleName';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { assertTypeScriptFileHasCanonicalDeclaration } from '../../programmable-units/type-script-file/canonical-declaration/assertTypeScriptFileHasCanonicalDeclaration';
import { exemptEngineProgramFromCanonicalComment } from '../../programmable-units/type-script-file/exemptEngineProgramFromCanonicalComment';
import { exemptPredicatesFromCanonicalComment } from '../../programmable-units/type-script-file/exemptPredicatesFromCanonicalComment';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { handleNoCanonicalDirective } from '../../programmable-units/type-script-file/handleNoCanonicalDirective';
import { omitProgramCanonicalExportRequirement } from '../../programmable-units/type-script-file/omitProgramCanonicalExportRequirement';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { parseTypeScriptFileComments } from '../../programmable-units/type-script-file/parseTypeScriptFileComments';
import {
  EngineFunctionConfigurationStreamMetatype,
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  ENGINE_FUNCTION_CONFIGURATION_LIST,
} from '../../programmable-units/engine-program-model/engineFunctionConfiguration';
import {
  LintAssertionOmissionCollection,
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';
import { buildDefaultFileCollectionTuple } from '../../programmable-units/file/buildDefaultFileCollectionTuple';

const programFileCache = new ProgramFileCache({
  namespace: 'lint-nonsense',
});

/**
 * Runs assertions for canonical declarations, comments, and readable names.
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
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    ...buildDefaultFileCollectionTuple(),
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
    parseTypeScriptFileComments,
    getCommentedProgramBodyDeclarationList,
    getTypeScriptFileImportList,

    filterEngineProgramFile,
    getEngineProgramLocator3,

    assertTypeScriptFileHasCanonicalDeclaration,
    assertTypeScriptFileHasCanonicalComment,
    handleNoCanonicalDirective,
    exemptEngineProgramFromCanonicalComment,
    exemptPredicatesFromCanonicalComment,
    omitProgramCanonicalExportRequirement,
    assertTypeScriptFileHasSensibleName,

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
