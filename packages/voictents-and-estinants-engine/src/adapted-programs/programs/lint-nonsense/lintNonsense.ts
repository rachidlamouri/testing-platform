import {
  runEngine,
  buildCollectionByCollectionId,
} from '../../../adapter/engine/runEngine';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { defaultFileCollectionIdCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { signalError } from '../../programmable-units/error/signalError';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program/getEngineProgramLocator3';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
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
  EngineFunctionConfigurationVoque,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import {
  LintAssertionOmissionVoictent,
  LINT_ASSERTION_OMISSION_GEPP,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';

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
          VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
        ],
      },
    ),
    new InMemoryCollection<EngineFunctionConfigurationVoque>({
      collectionId: ENGINE_FUNCTION_CONFIGURATION_GEPP,
      initialItemEggTuple: [
        CORE_ENGINE_FUNCTION_CONFIGURATION,
        CORE_ENGINE_FUNCTION_2_CONFIGURATION,
        ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
      ],
    }),
  ] as const,
  fileSystemNodeCollectionIdCombination: defaultFileCollectionIdCombination,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new LintAssertionOmissionVoictent({
      collectionId: LINT_ASSERTION_OMISSION_GEPP,
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
