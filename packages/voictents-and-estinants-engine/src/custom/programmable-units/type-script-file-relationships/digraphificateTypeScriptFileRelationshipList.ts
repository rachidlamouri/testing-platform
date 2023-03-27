import { posix } from 'path';
import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { DirectoryVoictent, DIRECTORY_GEPP } from '../file/directory';
import { Shape } from '../graph-visualization/directed-graph/attribute';
import {
  DirectedGraph,
  DirectedGraphRankDirection,
  DirectedGraphVoictent,
  DirectedSubgraph,
  DIRECTED_GRAPH_GEPP,
} from '../graph-visualization/directed-graph/directedGraph';
import { DirectedGraphEdge } from '../graph-visualization/directed-graph/directedGraphEdge';
import { DirectedGraphNode } from '../graph-visualization/directed-graph/directedGraphNode';
import {
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import { TypeScriptFileImportTypeName } from '../type-script-file/typeScriptFileImportList';
import {
  RelationshipNodeMetadata,
  TypeScriptFileRelationshipListVoictent,
  TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
} from './typeScriptFileRelationshipList';

export const digraphificateTypeScriptFileRelationshipList = buildEstinant()
  .fromOdeshinVoictent<TypeScriptFileRelationshipListVoictent>({
    gepp: TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
  })
  // TODO: make these odeshin voictents
  .andFromOdeshinVoictent<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromOdeshinVoictent<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepup<DirectedGraphVoictent>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .onPinbe((relationshipListTuple, directoryTuple, typeScriptFileTuple) => {
    const allRelationshipList = relationshipListTuple.flat();

    let rootDirectoryPathPartList: string[] = [];
    directoryTuple.forEach((directory) => {
      rootDirectoryPathPartList =
        directory.directoryPathPartList.length <
          rootDirectoryPathPartList.length ||
        rootDirectoryPathPartList.length === 0
          ? directory.directoryPathPartList
          : rootDirectoryPathPartList;
    });

    // TODO: move this join to a utility
    const rootDirectoryPath = rootDirectoryPathPartList.join('/');

    const isRoot = (directoryPath: string): boolean =>
      directoryPath === rootDirectoryPath;

    const graphByDirectoryPath = new Map<string, DirectedSubgraph>();

    const getOrInstantiateSubgraph = (
      directoryPath: string,
    ): DirectedSubgraph => {
      const directoryName = posix.basename(directoryPath);

      const subgraph: DirectedSubgraph = graphByDirectoryPath.get(
        directoryPath,
      ) ?? {
        isRoot: false,
        attributeByKey: {
          id: `cluster_${directoryPath}`,
          label: isRoot(directoryPath) ? directoryPath : directoryName,
          fontname: 'sans-serif',
        },
        nodeList: [],
        edgeList: [],
        subgraphList: [],
      };

      graphByDirectoryPath.set(directoryPath, subgraph);

      return subgraph;
    };

    directoryTuple.forEach((directory) => {
      // TODO: move these insights to the "File" type
      const { directoryPath } = directory;
      const parentDirectoryPath = posix.dirname(directoryPath);

      const graph = getOrInstantiateSubgraph(directoryPath);

      if (!isRoot(directoryPath)) {
        const parentGraph = getOrInstantiateSubgraph(parentDirectoryPath);
        parentGraph.subgraphList.push(graph);
      }
    });

    typeScriptFileTuple.forEach((file) => {
      const node: DirectedGraphNode = {
        attributeByKey: {
          id: file.filePath,
          label: posix.basename(file.filePath),
          shape: Shape.Box,
          fontname: 'sans-serif',
        },
      };

      const graph = graphByDirectoryPath.get(
        posix.dirname(file.filePath),
      ) as DirectedSubgraph;
      graph.nodeList.push(node);
    });

    const rootDirectoryGraph = graphByDirectoryPath.get(
      rootDirectoryPath,
    ) as DirectedSubgraph;

    const rootGraph: DirectedGraph = {
      isRoot: true,
      attributeByKey: {
        label: 'TypeScript File Relationships',
        rankdir: DirectedGraphRankDirection.LeftRight,
        fontname: 'sans-serif',
      },
      nodeList: [],
      edgeList: [],
      subgraphList: [rootDirectoryGraph],
    };

    allRelationshipList.forEach(({ node, importedNode }) => {
      const tailId = importedNode.nodePath;
      const headId = node.nodePath;
      const edgeId = `${tailId}:${headId}`;

      const edge: DirectedGraphEdge = {
        attributeByKey: {
          id: edgeId,
        },
        tailId,
        headId,
      };

      rootGraph.edgeList.push(edge);
    });

    const externalNodeByNodePath = new Map<string, RelationshipNodeMetadata>();
    allRelationshipList
      .map(({ importedNode }) => importedNode)
      .filter(
        (importedNode) =>
          importedNode.typeName === TypeScriptFileImportTypeName.External,
      )
      .forEach((importedNode) => {
        const node =
          externalNodeByNodePath.get(importedNode.nodePath) ?? importedNode;
        externalNodeByNodePath.set(importedNode.nodePath, node);
      });

    const externalSubgraph: DirectedSubgraph = {
      isRoot: false,
      attributeByKey: {
        id: 'cluster_Node Modules',
        label: 'Node Modules',
      },
      nodeList: [...externalNodeByNodePath.values()].map<DirectedGraphNode>(
        ({ nodePath }) => ({
          attributeByKey: {
            id: nodePath,
            label: nodePath,
            shape: Shape.Box,
            fontname: 'sans-serif',
          },
        }),
      ),
      edgeList: [],
      subgraphList: [],
    };

    rootGraph.subgraphList.unshift(externalSubgraph);

    return {
      zorn: 'type-script-file-relationship-graph',
      grition: rootGraph,
    };
  })
  .assemble();
