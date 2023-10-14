import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  buildCollectionIdCombination,
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
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
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
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
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileVoictent';
import { getDirectedGraphFromGraphElementGroup } from '../model-programs/getDirectedGraphFromGraphElementGroup';
import { groupGraphElements } from '../model-programs/groupGraphElements';
import { assertNoBoundaryOverlap } from './boundary/assertNoBoundaryOverlap';
import { InMemoryOdeshin3Voictent } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
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
import { defaultFileCollectionIdCombination } from '../../programmable-units/file/defaultFileGeppCombination';
import { getAllFactGraphElements } from './getAllFactGraphElements';
import { getBoundaryFromConfiguration } from './boundary/getBoundaryFromConfiguration';
import { getBoundaryPartition } from './partition-fact/getBoundaryPartition';
import {
  PARTITION_FACT_COLLECTION_ID,
  PartitionFactStreamMetatype,
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
import {
  LAYER_CONFIGURATION_GEPP,
  LAYER_CONFIGURATION_LIST,
  LayerConfigurationVoque,
} from './layer/layerConfiguration';
import { getLayer } from './layer/getLayer';
import { getLayerListTrie } from './layer/getLayerListTrie';
import { getLayerTrie } from './layer/getLayerTrie';
import {
  LAYER_LIST_TRIE_GEPP,
  LayerListTrieVoque,
} from './layer/layerListTrie';
import {
  LAYER_TRIE_COLLECTION_ID,
  LayerTrieStreamMetatype,
} from './layer/layerTrie';
import { getUtilityBoundary } from './boundary/getUtilityBoundary';
import { getProgrammableUnitBoundary } from './boundary/getProgrammableUnitBoundary';

const programFileCache = new ProgramFileCache({
  namespace: 'render-knowledge-graph',
});

/**
 * Renders an interactive HTML page showing the relationship
 * between parts of the project (files, directories, boundaries of concern, ..etc)
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
    new InMemoryOdeshin3Voictent<BoundaryConfigurationVoque>({
      collectionId: BOUNDARY_CONFIGURATION_GEPP,
      initialItemEggTuple: BOUNDARY_CONFIGURATION_LIST,
    }),
    new InMemoryOdeshin3Voictent<LayerConfigurationVoque>({
      collectionId: LAYER_CONFIGURATION_GEPP,
      initialItemEggTuple: LAYER_CONFIGURATION_LIST,
    }),
  ] as const,
  fileSystemNodeCollectionIdCombination: {
    ...defaultFileCollectionIdCombination,
    ...buildCollectionIdCombination([
      // keep as multiline list
      BOUNDED_DIRECTORY_GEPP,
      BOUNDED_FILE_GEPP,
    ] as const),
  },
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorVoictent({
      programFileCache,
    }),
    new InMemoryOdeshin3Voictent<PartitionFactStreamMetatype>({
      collectionId: PARTITION_FACT_COLLECTION_ID,
      initialItemEggTuple: [],
    }),
    new InMemoryCollection<PartitionedBoundaryListTrieVoque>({
      collectionId: PARTITIONED_BOUNDARY_LIST_TRIE_GEPP,
      initialItemEggTuple: [],
    }),
    new InMemoryCollection<PartitionedBoundaryTrieVoque>({
      collectionId: PARTITIONED_BOUNDARY_TRIE_GEPP,
      initialItemEggTuple: [],
    }),
    new InMemoryOdeshin3Voictent<PartitionedFileVoque>({
      collectionId: PARTITIONED_FILE_GEPP,
      initialItemEggTuple: [],
    }),
    new OutputFileCollection({
      programFileCache,
    }),
    new FactVoictent(),
    new FileDependencyVoictent(),
    new InMemoryCollection<LayerListTrieVoque>({
      collectionId: LAYER_LIST_TRIE_GEPP,
      initialItemEggTuple: [],
    }),
    new InMemoryCollection<LayerTrieStreamMetatype>({
      collectionId: LAYER_TRIE_COLLECTION_ID,
      initialItemEggTuple: [],
    }),
  ] as const),
  errorCollectionId: PROGRAM_ERROR_GEPP,
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

    getLayer,
    getLayerListTrie,
    getLayerTrie,

    getBoundaryFromConfiguration,
    getAdaptedProgramBoundary,
    getProgrammableUnitBoundary,
    getUtilityBoundary,

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
  serializeeCollectionIdList: [
    // keep this as a multi-line list for easier debugging
  ],
});
