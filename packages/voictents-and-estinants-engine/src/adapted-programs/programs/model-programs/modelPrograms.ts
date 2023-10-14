import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
  COLLECTIONS_AND_PROGRAMMED_TRANSFORMS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import {
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  EngineFunctionConfigurationStreamMetatype,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { addInteractivityToSvgDocument } from '../../programmable-units/graph-visualization/addInteractivityToSvgDocument';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { getEngineEstinantLocatorCollection2 } from '../../programmable-units/engine-program/getEngineEstinantLocatorCollection2';
import { getEngineProgram3 } from '../../programmable-units/engine-program/getEngineProgram3';
import { captureOutputFileDigestList } from '../../programmable-units/sanity-snapshot/captureOutputFileDigestList';
import { signalError } from '../../programmable-units/error/signalError';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { SANITY_SNAPSHOT_COLLECTION_ID } from '../../programmable-units/sanity-snapshot/sanitySnapshot';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorVoictent';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileVoictent';
import { EngineRunnerStrategy } from '../../../core/engine/runEngine';
import { getEngineVoque2 } from '../../programmable-units/engine-program/getEngineVoque2';
import { getEngineEstinant3 } from '../../programmable-units/engine-program/getEngineEstinant3';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program/getEngineProgramLocator3';
import { getEngineVoqueLocatorCollection2 } from '../../programmable-units/engine-program/getEngineVoqueLocatorCollection2';
import { getEngineEstinantGraphElements } from './getEngineEstinantGraphElements';
import { getEngineProgramVoqueElements } from './getEngineProgramVoqueElements';
import { getDirectedGraphMetadataById2 } from './getDirectedGraphMetadataById2';
import { getEngineEstinantMetadataEntry } from './getEngineEstinantMetadataEntry';
import { getInputMetadataEntry } from './getInputMetadataEntry';
import { getEngineVoqueMetadataEntry } from './getEngineVoqueMetadataEntry';
import { getTopLevelEngineProgramGraphElements } from './getTopLevelEngineProgramGraphElements';
import { getInputEdges } from './getInputEdges';
import { getOutputEdge } from './getOutputEdge';
import { groupGraphElements } from './groupGraphElements';
import { getDirectedGraphFromGraphElementGroup } from './getDirectedGraphFromGraphElementGroup';
import { getTopLevelEngineProgramMetadataEntries } from './getTopLevelEngineProgramMetadataEntries';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { assertNoCopyPasta } from './assertNoCopyPasta';
import { defaultFileCollectionIdCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { reportFailedLintAssertion } from '../../programmable-units/linting/reportFailedLintAssertion';
import {
  LINT_ASSERTION_OMISSION_COLLECTION_ID,
  LintAssertionOmissionCollection,
  LintAssertionOmissionVoque,
  NULL_OMISSION,
} from '../../programmable-units/linting/lintAssertionOmission';
import { reportErrorCount } from '../../programmable-units/error/reportErrorCount';
import { parseTypeScriptFileComments } from '../../programmable-units/type-script-file/parseTypeScriptFileComments';

const programFileCache = new ProgramFileCache({
  namespace: 'modelPrograms',
});

/**
 * Creates an interactive model for each engine program.
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
    new LintAssertionOmissionCollection<LintAssertionOmissionVoque>({
      collectionId: LINT_ASSERTION_OMISSION_COLLECTION_ID,
      // TODO: fix and remove omissions
      initialItemEggTuple: [
        // keep this multiline
        NULL_OMISSION,
      ],
    }),
  ] as const,
  fileSystemNodeCollectionIdCombination: defaultFileCollectionIdCombination,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorCollection({
      programFileCache,
    }),
    new OutputFileCollection({
      programFileCache,
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
    getEngineEstinantLocatorCollection2,
    getEngineEstinant3,
    getEngineProgram3,
    getEngineVoqueLocatorCollection2,
    getEngineVoque2,

    getTopLevelEngineProgramGraphElements,
    getEngineProgramVoqueElements,
    getEngineEstinantGraphElements,
    getInputEdges,
    getOutputEdge,
    groupGraphElements,
    getDirectedGraphFromGraphElementGroup,

    getTopLevelEngineProgramMetadataEntries,
    getEngineVoqueMetadataEntry,
    getEngineEstinantMetadataEntry,
    getInputMetadataEntry,
    getDirectedGraphMetadataById2,

    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    captureOutputFileDigestList,

    assertNoCopyPasta,

    // TODO: add the audit back in when we don't need the NULL_OMISSION
    // auditLintAssertionOmissions,
    reportFailedLintAssertion,
    reportErrors,
    reportErrorCount,
    signalError,
  ] as const,
  programFileCache,
  serializeeCollectionIdList: [
    // note: keep this is a multiline list for easier debugging
    SANITY_SNAPSHOT_COLLECTION_ID,
  ],
  strategy: EngineRunnerStrategy.WaitForAllDependencies,
});
