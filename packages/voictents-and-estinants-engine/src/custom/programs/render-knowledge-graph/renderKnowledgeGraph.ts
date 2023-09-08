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
  fileSystemNodeGeppCombination: defaultFileGeppCombination,
  uninferableVoictentByGepp: buildVoictentByGepp([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new InMemoryVoictent<PartitionedBoundaryListTrieVoque>({
      gepp: PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
      initialHubblepupPelueTuple: [],
    }),
    new InMemoryVoictent<PartitionedBoundaryTrieVoque>({
      gepp: PARTITIONED_BOUNDARY_TRIE_GEPP,
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

    associateTypeScriptFileToTypescriptConfiguration,
    parseTypeScriptFile,
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

    // getDirectoriesWithFiles,
    // getDirectoryBoundaryRelationship,
    // getDirectoryFact,
    // getDirectoryToParentRelationshipFact,
    // getDirectoryGraphElements,

    // assertDirectoriesHaveBoundaries,

    // getFileFact,
    // getFileGraphElements,

    // getDependencyFacts,

    // getAssociatedBoundaryFacts,
    // getAssociatedBoundaryFactGraphElements,

    // getAssociatedFileGraphElements,

    // getInvertedDependencyGroup,
    // getInvertedDependencyGraphElements,

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
