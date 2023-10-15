import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import {
  buildCollectionIdCombination,
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import {
  EngineFunctionConfigurationStreamMetatype,
  ENGINE_FUNCTION_CONFIGURATION_COLLECTION_ID,
  CORE_ENGINE_FUNCTION_CONFIGURATION,
  CORE_ENGINE_FUNCTION_2_CONFIGURATION,
  ADAPTED_ENGINE_FUNCTION_CONFIGURATION,
} from '../../programmable-units/engine-program/engineFunctionConfiguration';
import { getEngineProgramLocator3 } from '../../programmable-units/engine-program/getEngineProgramLocator3';
import { PROGRAM_ERROR_COLLECTION_ID } from '../../programmable-units/error/programError';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorVoictent';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
  COLLECTIONS_AND_PROGRAMMED_TRANSFORMS_FULL_FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { filterEngineProgramFile } from '../../programmable-units/type-script-file-relationships/filterEngineProgramFile';
import { associateTypeScriptFileToTypescriptConfiguration } from '../../programmable-units/type-script-file/associateTypeScriptFileToTypescriptConfiguration';
import { getCommentedProgramBodyDeclarationList } from '../../programmable-units/type-script-file/getCommentedProgramBodyDeclarationList';
import { getTypeScriptFileImportList } from '../../programmable-units/type-script-file/getTypeScriptFileImportList';
import { parseTypeScriptFile } from '../../programmable-units/type-script-file/parseTypeScriptFile';
import { getAdaptedProgramBoundary } from './boundary/getAdaptedProgramBoundary';
import {
  BOUNDARY_CONFIGURATION_COLLECTION_ID,
  BoundaryConfigurationStreamMetatype,
  BOUNDARY_CONFIGURATION_LIST,
} from './boundary/boundaryConfiguration';
import { reportErrors } from '../../programmable-units/error/reportErrors';
import { signalError } from '../../programmable-units/error/signalError';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument2 } from '../../programmable-units/graph-visualization/renderGraphvizCodeToSvgDocument2';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileCollection';
import { getDirectedGraphFromGraphElementGroup } from '../model-programs/getDirectedGraphFromGraphElementGroup';
import { groupGraphElements } from '../model-programs/groupGraphElements';
import { assertNoBoundaryOverlap } from './boundary/assertNoBoundaryOverlap';
import { InMemoryIdentifiableItem3Collection } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { getCommonBoundaryRoot } from './common-boundary-root/getCommonBoundaryRoot';
import {
  PARTITIONED_BOUNDARY_LIST_TRIE_COLLECTION_ID,
  PartitionedBoundaryListTrieStreamMetatype,
} from './boundary/partitionedBoundaryListTrie';
import { getPartitionedBoundaryListTrie } from './boundary/getPartitionedBoundaryListTrie';
import {
  PARTITIONED_BOUNDARY_TRIE_COLLECTION_ID,
  PartitionedBoundaryTrieStreamMetatype,
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
  PARTITIONED_FILE_COLLECTION_ID,
  PartitionedFileStreamMetatype,
} from './file/partitionedFile';
import { getFileDependencies } from './dependency/getFileDependencies';
import { getBoundedFile } from './file/getBoundedFile';
import { getPartitionedFileSystemNodes } from './getPartitionedFileSystemNodes';
import { getBoundedDirectory } from './directory/getBoundedDirectory';
import { getDirectoryFact2 } from './directory/getDirectoryFact2';
import { getFileFact2 } from './file/getFileFact2';
import { BOUNDED_DIRECTORY_COLLECTION_ID } from './directory/boundedDirectory';
import { BOUNDED_FILE_COLLECTION_ID } from './file/boundedFile';
import { getPartitionedFileDependency } from './dependency/getPartitionedFileDependency';
import { getPartitionedFileDependencyPathConstituents } from './dependency/getPartitionedFileDependencyPathConstituents';
import { getFileDependencyPathNodeFact } from './dependency/dependency-path/getFileDependencyPathNodeFact';
import { aggregateFacts } from './fact/aggregateFacts';
import { FactCollection } from './fact/fact';
import { FileDependencyCollection } from './dependency/fileDependencyCollection';
import { getDirectoriesWithFiles } from './directory/getDirectoriesWithFiles';
import { assertDirectoriesHaveBoundaries } from './directory/assertDirectoriesHaveBoundaries';
import { getFileAncestorDirectoryPathSet } from '../../programmable-units/file/getFileAncestorDirectoryPathSet';
import { parseTypeScriptFileComments } from '../../programmable-units/type-script-file/parseTypeScriptFileComments';
import {
  LAYER_CONFIGURATION_COLLECTION_ID,
  LAYER_CONFIGURATION_LIST,
  LayerConfigurationStreamMetatype,
} from './layer/layerConfiguration';
import { getLayer } from './layer/getLayer';
import { getLayerListTrie } from './layer/getLayerListTrie';
import { getLayerTrie } from './layer/getLayerTrie';
import {
  LAYER_LIST_TRIE_COLLECTION_ID,
  LayerListTrieStreamMetatype,
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
    new InMemoryIdentifiableItem3Collection<BoundaryConfigurationStreamMetatype>(
      {
        collectionId: BOUNDARY_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: BOUNDARY_CONFIGURATION_LIST,
      },
    ),
    new InMemoryIdentifiableItem3Collection<LayerConfigurationStreamMetatype>({
      collectionId: LAYER_CONFIGURATION_COLLECTION_ID,
      initialItemEggTuple: LAYER_CONFIGURATION_LIST,
    }),
  ] as const,
  fileSystemNodeCollectionIdCombination: {
    ...defaultFileCollectionIdCombination,
    ...buildCollectionIdCombination([
      // keep as multiline list
      BOUNDED_DIRECTORY_COLLECTION_ID,
      BOUNDED_FILE_COLLECTION_ID,
    ] as const),
  },
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    new ProgramErrorCollection({
      programFileCache,
    }),
    new InMemoryIdentifiableItem3Collection<PartitionFactStreamMetatype>({
      collectionId: PARTITION_FACT_COLLECTION_ID,
      initialItemEggTuple: [],
    }),
    new InMemoryCollection<PartitionedBoundaryListTrieStreamMetatype>({
      collectionId: PARTITIONED_BOUNDARY_LIST_TRIE_COLLECTION_ID,
      initialItemEggTuple: [],
    }),
    new InMemoryCollection<PartitionedBoundaryTrieStreamMetatype>({
      collectionId: PARTITIONED_BOUNDARY_TRIE_COLLECTION_ID,
      initialItemEggTuple: [],
    }),
    new InMemoryIdentifiableItem3Collection<PartitionedFileStreamMetatype>({
      collectionId: PARTITIONED_FILE_COLLECTION_ID,
      initialItemEggTuple: [],
    }),
    new OutputFileCollection({
      programFileCache,
    }),
    new FactCollection(),
    new FileDependencyCollection(),
    new InMemoryCollection<LayerListTrieStreamMetatype>({
      collectionId: LAYER_LIST_TRIE_COLLECTION_ID,
      initialItemEggTuple: [],
    }),
    new InMemoryCollection<LayerTrieStreamMetatype>({
      collectionId: LAYER_TRIE_COLLECTION_ID,
      initialItemEggTuple: [],
    }),
  ] as const),
  errorCollectionId: PROGRAM_ERROR_COLLECTION_ID,
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
