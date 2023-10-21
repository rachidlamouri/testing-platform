import { posix } from 'path';
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
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
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
import {
  assertFileSystemNodePathLiteralExists,
  fileSystemNodePathLiteralExistsRule,
} from './assertFileSystemNodePathLiteralExists';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionCollection,
  LintAssertionOmissionInstance,
  LintAssertionOmissionStreamMetatype,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';
import { LintAssertionId } from '../../programmable-units/linting/lintAssertion';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { FileLineColumnSourceInstance } from '../../programmable-units/linting/source/fileLineColumnSource';
import { buildDefaultFileCollectionTuple } from '../../programmable-units/file/buildDefaultFileCollectionTuple';

const programFileCache = new ProgramFileCache({
  namespace: 'lint-file-system-node-path-literals',
});

const programSource = new FileSourceInstance({
  filePath: posix.relative('', __filename),
});

/**
 * Looks for string literals that look like they reference file system node paths, and then checks if the reference path exists on disk.
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
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    ...buildDefaultFileCollectionTuple(),
    new ProgramErrorCollection({
      programFileCache,
    }),
    new LintAssertionOmissionCollection<LintAssertionOmissionStreamMetatype>({
      collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
      initialItemEggTuple: [
        // keep multiline
        NULL_OMISSION,
        new LintAssertionOmissionInstance({
          omitterSource: programSource,
          omittedAssertionId: new LintAssertionId({
            rule: fileSystemNodePathLiteralExistsRule,
            lintSource: new FileLineColumnSourceInstance({
              filePath:
                'packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/renameAllNonsense.ts',
              lineNumber: 70,
              columnNumber: 6,
            }),
          }),
        }),
        new LintAssertionOmissionInstance({
          omitterSource: programSource,
          omittedAssertionId: new LintAssertionId({
            rule: fileSystemNodePathLiteralExistsRule,
            lintSource: new FileLineColumnSourceInstance({
              filePath:
                'packages/mdd-engine/src/adapted-programs/programs/rename-nonsense/progressLog.ts',
              lineNumber: 4,
              columnNumber: 2,
            }),
          }),
        }),
      ],
    }),
  ] as const),
  errorCollectionId: PROGRAM_ERROR_COLLECTION_ID,
  programmedTransformTuple: [
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
  serializeeCollectionIdList: [
    // keep this as a multi-line list for easier debugging
  ],
  programFileCache,
});
