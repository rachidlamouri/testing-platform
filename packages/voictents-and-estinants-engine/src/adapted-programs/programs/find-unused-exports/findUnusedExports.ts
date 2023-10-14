import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FileSystemObjectEnumeratorConfigurationVoque,
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { auditLintAssertionOmissions } from '../../programmable-units/linting/auditLintAssertionOmissions';
import {
  LINT_ASSERTION_OMISSION_GEPP,
  LintAssertionOmissionVoictent,
  LintAssertionOmissionVoque,
} from '../../programmable-units/linting/lintAssertionOmission';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { getTypeScriptFileExportList } from '../../programmable-units/type-script-file/getTypeScriptFileExportList';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { markUnusedExports } from './markUnusedExports';
import { omittedUnusedExportList } from './omittedUnusedExportList';
import { parseTypeScriptFileComments } from '../../programmable-units/type-script-file/parseTypeScriptFileComments';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';

const programFileCache = new ProgramFileCache({
  namespace: 'findUnusedExports',
});

/**
 * Reports granular export statements that are not imported by anything
 *
 * @canonicalComment
 *
 * @todo check if we still need to lint for unused files or if all current rules will catch that
 */
runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationVoque>({
      collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
      initialItemEggTuple: [
        VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
      ],
    }),
    new LintAssertionOmissionVoictent<LintAssertionOmissionVoque>({
      collectionId: LINT_ASSERTION_OMISSION_GEPP,
      initialItemEggTuple: omittedUnusedExportList,
    }),
  ] as const,
  fileSystemNodeCollectionIdCombination: defaultFileGeppCombination,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorVoictent({
      programFileCache,
    }),
  ] as const),
  programmedTransformTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    parseTypeScriptFileComments,
    getCommentedProgramBodyDeclarationList,
    getTypeScriptFileImportList,
    getTypeScriptFileExportList,

    markUnusedExports,

    auditLintAssertionOmissions,
    reportFailedLintAssertion,
    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  errorCollectionId: PROGRAM_ERROR_GEPP,
  serializeeCollectionIdList: [
    // note: keep this is a multiline list for easier debugging
  ],
  programFileCache,
});
