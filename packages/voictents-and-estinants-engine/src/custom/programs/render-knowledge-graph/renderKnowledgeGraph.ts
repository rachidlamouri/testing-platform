import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import {
  buildVoictentByGepp,
  digikikify,
} from '../../../type-script-adapter/digikikify';
import { ProgramFileCache } from '../../../utilities/programFileCache';
import {
  EngineFunctionConfigurationVoque,
  ENGINE_FUNCTION_CONFIGURATION_GEPP,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program/getEngineProgramLocator3';
import { PROGRAM_ERROR_GEPP } from '../../programmable-units/error/programError';
import { ProgramErrorVoictent } from '../../programmable-units/error/programErrorVoictent';
import {
  categorizeFiles,
  categorizeFiles2,
} from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_GEPP,
  FileSystemObjectEnumeratorConfigurationVoque,
  VOICTENTS_AND_ESTINANTS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { getAdaptedProgramBoundary } from './boundary/getAdaptedProgramBoundary';
import {
  BOUNDARY_GEPP,
  BoundaryVoque,
  STATIC_BOUNDARY_LIST,
} from './boundary/boundary';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { assertBoundaryDirectoryExists } from './boundary/assertBoundaryDirectoryExists';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument2 } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument2';
import { OutputFileVoictent } from '../../programmable-units/output-file/outputFileVoictent';
import { constructKnowledgeGraph } from './constructKnowledgeGraph';
import { getDirectedGraphFromGraphElementGroup } from '../model-programs/getDirectedGraphFromGraphElementGroup';
import { groupGraphElements } from '../model-programs/groupGraphElements';
import { getBoundaryFactAndGraphElements } from './boundary/getBoundaryFactAndGraphElements';
import { stubMetadata } from './boundary/stubMetadata';
import { assertNoBoundaryOverlap } from './boundary/assertNoBoundaryOverlap';
import { InMemoryOdeshin2ListVoictent } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { getDirectoriesWithFiles } from './directory/getDirectoriesWithFiles';
import { assertDirectoriesHaveBoundaries } from './directory/assertDirectoriesHaveBoundaries';
import { getDirectoryFact } from './directory/getDirectoryFact';
import { getDirectoryGraphElements } from './directory/getDirectoryGraphElements';
import { getCommonBoundaryRoot } from './common-boundary-root/getCommonBoundaryRoot';
import {
  BOUNDARY_TRIE_A_GEPP,
  BoundaryTrieAVoque,
} from './boundary/boundaryTrieA';
import { getBoundaryTrieA } from './boundary/getBoundaryTrieA';
import { getBoundaryTrieB } from './boundary/getBoundaryTrieB';
import {
  BoundaryTrieBVoque,
  BOUNDARY_TRIE_B_GEPP,
} from './boundary/boundaryTrieB';
import { getDirectoryBoundaryRelationship } from './directory/getDirectoryBoundaryRelationship';
import { getFileFact } from './file/getFileFact';
import { getFileGraphElements } from './file/getFileGraphElements';
import { getDependencyFacts } from './dependency/getDependencyFacts';
import { getInvertedDependencyGroup } from './dependency/getInvertedDependencyGroup';
import { getInvertedDependencyGraphElements } from './dependency/getInvertedDependencyGraphElements';
import { renderApp } from './app/node/renderApp';
import { constructDynamicIndexFile } from './constructDynamicIndexFile';
import { decodeAndRecastSvgDocument } from './decodeAndRecastSvgDocument';
import { constructDynamicMetadataFile } from './constructDynamicMetadataFile';
import { getAssociatedBoundaryFacts } from './associated-boundary/getAssociatedBoundaryFacts';
import { getAssociatedBoundaryFactGraphElements } from './associated-boundary/getAssociatedBoundaryFactGraphElements';
import { getDirectoryToParentRelationshipFact } from './directory/getDirectoryToParentRelationshipFact';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';

const programFileCache = new ProgramFileCache({
  namespace: 'render-knowledge-graph',
});

/**
 * Renders an interactive HTML page showing the relationship
 * between parts of the project (files, directories, boundaries of concern, ..etc)
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
    new InMemoryOdeshin2ListVoictent<BoundaryVoque>({
      gepp: BOUNDARY_GEPP,
      initialHubblepupPelueTuple: STATIC_BOUNDARY_LIST,
    }),
  ] as const,
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new InMemoryVoictent<BoundaryTrieAVoque>({
      gepp: BOUNDARY_TRIE_A_GEPP,
      initialHubblepupPelueTuple: [],
    }),
    new InMemoryVoictent<BoundaryTrieBVoque>({
      gepp: BOUNDARY_TRIE_B_GEPP,
      initialHubblepupPelueTuple: [],
    }),
    new OutputFileVoictent({
      programFileCache,
    }),
  ] as const),
  errorGepp: PROGRAM_ERROR_GEPP,
  estinantTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,
    categorizeFiles2,

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
    getTypeScriptFileImportList,
    getCommentedProgramBodyDeclarationList,

    filterEngineProgramFile,
    getEngineProgramLocator3,

    getAdaptedProgramBoundary,
    getCommonBoundaryRoot,
    getBoundaryTrieA,
    getBoundaryTrieB,
    getBoundaryFactAndGraphElements,

    assertBoundaryDirectoryExists,
    assertNoBoundaryOverlap,

    getDirectoriesWithFiles,
    getDirectoryBoundaryRelationship,
    getDirectoryFact,
    getDirectoryToParentRelationshipFact,
    getDirectoryGraphElements,

    assertDirectoriesHaveBoundaries,

    getFileFact,
    getFileGraphElements,

    getDependencyFacts,

    getAssociatedBoundaryFacts,
    getAssociatedBoundaryFactGraphElements,

    // getAssociatedFileGraphElements,

    getInvertedDependencyGroup,
    getInvertedDependencyGraphElements,

    groupGraphElements,
    getDirectedGraphFromGraphElementGroup,
    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument2,
    decodeAndRecastSvgDocument,

    constructDynamicMetadataFile,
    constructDynamicIndexFile,

    renderApp,

    // TODO: remove this
    stubMetadata,

    constructKnowledgeGraph,

    reportErrors,
    signalError,
  ] as const,
  programFileCache,
  serializeeGeppList: [
    // keep this as a multi-line list for easier debugging
  ],
});
