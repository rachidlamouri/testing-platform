import { InMemoryVoictent } from '../../../core/engine/inMemoryVoictent';
import {
  buildGeppCombination,
  buildVoictentByGepp,
  digikikify,
} from '../../adapter/digikikify';
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
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
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
  BOUNDARY_CONFIGURATION_GEPP,
  BoundaryConfigurationVoque,
  BOUNDARY_CONFIGURATION_LIST,
} from './boundary/boundaryConfiguration';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument2 } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument2';
import { OutputFileVoictent } from '../../programmable-units/output-file/outputFileVoictent';
import { getDirectedGraphFromGraphElementGroup } from '../model-programs/getDirectedGraphFromGraphElementGroup';
import { groupGraphElements } from '../model-programs/groupGraphElements';
import { assertNoBoundaryOverlap } from './boundary/assertNoBoundaryOverlap';
import { InMemoryOdeshin3Voictent } from '../../../core/engine/inMemoryOdeshinVoictent2';
import { getCommonBoundaryRoot } from './common-boundary-root/getCommonBoundaryRoot';
import {
  PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
  PartitionedBoundaryListTrieVoque,
} from './boundary/partitionedBoundaryListTrie';
import { getPartitionedBoundaryListTrie } from './boundary/getPartitionedBoundaryListTrie';
import {
  PARTITIONED_BOUNDARY_TRIE_GEPP,
  PartitionedBoundaryTrieVoque,
} from './boundary/partitionedBoundaryTrie';
import { getPartitionedBoundaryTrie } from './boundary/getPartitionedBoundaryTrie';
import { renderApp } from './app/node/renderApp';
import { constructDynamicIndexFile } from './constructDynamicIndexFile';
import { decodeAndRecastSvgDocument } from './decodeAndRecastSvgDocument';
import { constructDynamicMetadataFile } from './constructDynamicMetadataFile';
import { defaultFileGeppCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { getAllFactGraphElements } from './getAllFactGraphElements';
import { getBoundaryFromConfiguration } from './boundary/getBoundaryFromConfiguration';
import { getBoundaryPartition } from './partition-fact/getBoundaryPartition';
import {
  PARTITION_FACT_GEPP,
  PartitionFactVoque,
} from './partition-fact/partitionFact';
import {
  PARTITIONED_FILE_GEPP,
  PartitionedFileVoque,
} from './file/partitionedFile';
import { getFileDependencies } from './dependency/getFileDependencies';
import { getBoundedFile } from './file/getBoundedFile';
import { getPartitionedFileSystemNodes } from './getPartitionedFileSystemNodes';
import { getBoundedDirectory } from './directory/getBoundedDirectory';
import { getDirectoryFact2 } from './directory/getDirectoryFact2';
import { getFileFact2 } from './file/getFileFact2';
import { BOUNDED_DIRECTORY_GEPP } from './directory/boundedDirectory';
import { BOUNDED_FILE_GEPP } from './file/boundedFile';
import { getPartitionedFileDependency } from './dependency/getPartitionedFileDependency';
import { getPartitionedFileDependencyPathConstituents } from './dependency/getPartitionedFileDependencyPathConstituents';
import { getFileDependencyPathNodeFact } from './dependency/dependency-path/getFileDependencyPathNodeFact';
import { aggregateFacts } from './fact/aggregateFacts';
import { FactVoictent } from './fact/fact';
import { FileDependencyVoictent } from './dependency/fileDependencyVoictent';
import { getDirectoriesWithFiles } from './directory/getDirectoriesWithFiles';
import { assertDirectoriesHaveBoundaries } from './directory/assertDirectoriesHaveBoundaries';
import { getFileAncestorDirectoryPathSet } from '../../programmable-units/file/getFileAncestorDirectoryPathSet';
import { parseTypeScriptFileComments } from '../../programmable-units/type-script-file/parseTypeScriptFileComments';

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
    new InMemoryOdeshin3Voictent<BoundaryConfigurationVoque>({
      gepp: BOUNDARY_CONFIGURATION_GEPP,
      initialHubblepupPelueTuple: BOUNDARY_CONFIGURATION_LIST,
    }),
  ] as const,
  fileSystemNodeGeppCombination: {
    ...defaultFileGeppCombination,
    ...buildGeppCombination([
      // keep as multiline list
      BOUNDED_DIRECTORY_GEPP,
      BOUNDED_FILE_GEPP,
    ] as const),
  },
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new InMemoryOdeshin3Voictent<PartitionFactVoque>({
      gepp: PARTITION_FACT_GEPP,
      initialHubblepupPelueTuple: [],
    }),
    new InMemoryVoictent<PartitionedBoundaryListTrieVoque>({
      gepp: PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
      initialHubblepupPelueTuple: [],
    }),
    new InMemoryVoictent<PartitionedBoundaryTrieVoque>({
      gepp: PARTITIONED_BOUNDARY_TRIE_GEPP,
      initialHubblepupPelueTuple: [],
    }),
    new InMemoryOdeshin3Voictent<PartitionedFileVoque>({
      gepp: PARTITIONED_FILE_GEPP,
      initialHubblepupPelueTuple: [],
    }),
    new OutputFileVoictent({
      programFileCache,
    }),
    new FactVoictent(),
    new FileDependencyVoictent(),
  ] as const),
  errorGepp: PROGRAM_ERROR_GEPP,
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

    getBoundaryFromConfiguration,
    getAdaptedProgramBoundary,

    getCommonBoundaryRoot,
    getBoundaryPartition,

    getPartitionedBoundaryListTrie,
    assertNoBoundaryOverlap,

    getPartitionedBoundaryTrie,

    getBoundedDirectory,
    getDirectoriesWithFiles,
    assertDirectoriesHaveBoundaries,

    getFileAncestorDirectoryPathSet,
    getBoundedFile,
    getFileDependencies,
    getPartitionedFileSystemNodes,
    getDirectoryFact2,
    getFileFact2,

    getPartitionedFileDependency,
    getPartitionedFileDependencyPathConstituents,
    getFileDependencyPathNodeFact,

    aggregateFacts,
    getAllFactGraphElements,

    groupGraphElements,
    getDirectedGraphFromGraphElementGroup,
    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument2,
    decodeAndRecastSvgDocument,

    constructDynamicMetadataFile,
    constructDynamicIndexFile,

    renderApp,

    reportErrors,
    signalError,
  ] as const,
  programFileCache,
  serializeeGeppList: [
    // keep this as a multi-line list for easier debugging
  ],
});
