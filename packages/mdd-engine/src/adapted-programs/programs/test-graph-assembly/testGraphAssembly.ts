import {
  buildCollectionByCollectionId,
  runEngine,
} from '../../../adapter/engine/runEngine';
import { categorizeFiles } from '../../programmable-units/file/categorizeFiles';
import { enumerateFileSystemObjects } from '../../programmable-units/file/enumerateFileSystemObjects';
import {
  FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
  FileSystemObjectEnumeratorConfigurationStreamMetatype,
} from '../../programmable-units/file/fileSystemObjectEnumeratorConfiguration';
import { captureOutputFileDigestList } from '../../programmable-units/sanity-snapshot/captureOutputFileDigestList';
import { InMemoryCollection } from '../../../layer-agnostic-utilities/collection/inMemoryCollection';
import { InMemoryIdentifiableItem3Collection } from '../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { ProgramFileCache } from '../../../layer-agnostic-utilities/program/programFileCache';
import { SANITY_SNAPSHOT_COLLECTION_ID } from '../../programmable-units/sanity-snapshot/sanitySnapshot';
import { OutputFileCollection } from '../../programmable-units/output-file/outputFileCollection';
import { buildDefaultFileCollectionTuple } from '../../programmable-units/file/buildDefaultFileCollectionTuple';
import { DirectedSubgraphLocator } from '../../programmable-units/graph-visualization/directed-graph/locator/directedSubgraphLocator';
import { groupGraphElements } from '../../programmable-units/graph-visualization/directed-graph/element-group/groupGraphElements';
import {
  DIRECTED_GRAPH_ELEMENT_COLLECTION_ID,
  DirectedGraphElementStreamMetatype,
} from '../../programmable-units/graph-visualization/directed-graph/element/directedGraphElement';
import { DirectedSubgraph } from '../../programmable-units/graph-visualization/directed-graph/element/directedSubgraph';
import { DirectedGraphNode } from '../../programmable-units/graph-visualization/directed-graph/element/directedGraphNode';
import { DirectedCluster } from '../../programmable-units/graph-visualization/directed-graph/element/directedCluster';
import { DirectedClusterLocator } from '../../programmable-units/graph-visualization/directed-graph/locator/directedClusterLocator';
import { DirectedGraph } from '../../programmable-units/graph-visualization/directed-graph/element/directedGraph';
import { DirectedEdge } from '../../programmable-units/graph-visualization/directed-graph/element/directedEdge';
import { ProgramErrorCollection } from '../../programmable-units/error/programErrorCollection';
import { DirectedGraphLocator } from '../../programmable-units/graph-visualization/directed-graph/locator/directedGraphLocator';
import { FileSourceInstance } from '../../programmable-units/linting/source/fileSource';
import { encodeDirectedGraphAsGraphvizCode } from '../../programmable-units/graph-visualization/directed-graph/graphviz-adapter/programmable/encodeDirectedGraphAsGraphvizCode';
import { renderGraphvizCodeToSvgDocument } from '../../programmable-units/graph-visualization/directed-graph/svg-adapter/renderGraphvizCodeToSvgDocument';
import { addInteractivityToSvgDocument } from '../../programmable-units/graph-visualization/directed-graph/base-interactivity/addInteractivityToSvgDocument';
import { GraphLikeLabelLocation } from '../../programmable-units/graph-visualization/directed-graph/attributeByKeyGSC';
import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/graphviz-adapter/element-attribute-by-key/partialNodeAttributeByKey';

const programFileCache = new ProgramFileCache({
  namespace: 'testGraphAssembly',
});

const programSource = new FileSourceInstance({
  absoluteFilePath: __filename,
});

const graphLocator = new DirectedGraphLocator({
  source: programSource,
});

const subgraphLocator = new DirectedSubgraphLocator({
  graphLocator,
  parentLocator: graphLocator,
  source: programSource,
});

const clusterXLocator = new DirectedClusterLocator({
  graphLocator,
  parentLocator: graphLocator,
  source: programSource,
  distinguisher: 'x',
});

const clusterYLocator = new DirectedClusterLocator({
  graphLocator,
  parentLocator: clusterXLocator,
  source: programSource,
  distinguisher: 'y',
});

const nodeA = new DirectedGraphNode({
  graphLocator,
  parentLocator: subgraphLocator,
  inputAttributeByKey: {
    label: 'node a',
  },
  source: programSource,
  distinguisher: 'a',
});

const nodeB = new DirectedGraphNode({
  graphLocator,
  parentLocator: subgraphLocator,
  inputAttributeByKey: {
    label: 'node b',
  },
  source: programSource,
  distinguisher: 'b',
});

const nodeC = new DirectedGraphNode({
  graphLocator,
  parentLocator: clusterXLocator,
  inputAttributeByKey: {
    label: 'node c',
  },
  source: programSource,
  distinguisher: 'c',
});

const nodeD = new DirectedGraphNode({
  graphLocator,
  parentLocator: clusterXLocator,
  inputAttributeByKey: {
    label: 'node d',
  },
  source: programSource,
  distinguisher: 'd',
});

const nodeE = new DirectedGraphNode({
  graphLocator,
  parentLocator: clusterYLocator,
  inputAttributeByKey: {
    label: 'node e',
    shape: NodeShape.InvertedTriangle,
  },
  source: programSource,
  distinguisher: 'e',
});

const edge1 = new DirectedEdge({
  graphLocator,
  tail: nodeA,
  head: nodeB,
  source: programSource,
});

const edge2 = new DirectedEdge({
  graphLocator,
  tail: nodeC,
  head: nodeD,
  source: programSource,
});

const edge3 = new DirectedEdge({
  graphLocator,
  tail: nodeB,
  head: nodeE,
  source: programSource,
});

const edge4 = new DirectedEdge({
  graphLocator,
  tail: nodeD,
  head: nodeE,
  source: programSource,
});

const graph = new DirectedGraph({
  locator: graphLocator,
  inputAttributeByKey: {
    label: 'My Graph',
    labelloc: GraphLikeLabelLocation.Top,
  },
  outputFileName: 'my_graph',
});

const subgraph = new DirectedSubgraph({
  locator: subgraphLocator,
  inputAttributeByKey: {},
});

const clusterX = new DirectedCluster({
  locator: clusterXLocator,
  inputAttributeByKey: {
    label: 'my cluster x',
  },
});

const clusterY = new DirectedCluster({
  locator: clusterYLocator,
  inputAttributeByKey: {
    label: 'my cluster y',
  },
});

/**
 * Example program to demonstrate assembling a graph from its parts
 *
 * @canonicalComment
 */
runEngine({
  explicitCollectionTuple: [
    new InMemoryCollection<FileSystemObjectEnumeratorConfigurationStreamMetatype>(
      {
        collectionId: FILE_SYSTEM_OBJECT_ENUMERATOR_CONFIGURATION_COLLECTION_ID,
        initialItemEggTuple: [
          {
            directoryPath:
              'packages/mdd-engine/src/adapted-programs/programmable-units/graph-visualization',
            ignoredNodePathConfigurationList: [],
          },
        ],
      },
    ),
    new InMemoryIdentifiableItem3Collection<DirectedGraphElementStreamMetatype>(
      {
        collectionId: DIRECTED_GRAPH_ELEMENT_COLLECTION_ID,
        initialItemEggTuple: [
          graph,
          subgraph,
          clusterX,
          clusterY,
          nodeA,
          nodeB,
          nodeC,
          nodeD,
          nodeE,
          edge1,
          edge2,
          edge3,
          edge4,
        ],
      },
    ),
  ] as const,
  uninferableCollectionByCollectionId: buildCollectionByCollectionId([
    ...buildDefaultFileCollectionTuple(),
    new OutputFileCollection({
      programFileCache,
    }),
    new ProgramErrorCollection({
      programFileCache,
    }),
  ] as const),
  programmedTransformTuple: [
    enumerateFileSystemObjects,
    categorizeFiles,

    groupGraphElements,
    encodeDirectedGraphAsGraphvizCode,
    renderGraphvizCodeToSvgDocument,
    addInteractivityToSvgDocument,

    captureOutputFileDigestList,
  ] as const,
  serializeeCollectionIdList: [SANITY_SNAPSHOT_COLLECTION_ID],
  programFileCache,
});
