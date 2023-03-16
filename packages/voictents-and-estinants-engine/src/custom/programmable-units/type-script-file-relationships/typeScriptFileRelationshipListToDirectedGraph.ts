import { posix } from 'path';
import { buildCortmum } from '../../../type-script-adapter/estinant/cortmum';
import { Vicken } from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
import {
  Directory,
  DirectoryOdeshin,
  DirectoryVoictent,
  DIRECTORY_GEPP,
} from '../file/directory';
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
  TypeScriptFileOdeshin,
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import { TypeScriptFileImportTypeName } from '../type-script-file/typeScriptFileImportList';
import {
  RelationshipNodeMetadata,
  TypeScriptFileRelationship,
  TypeScriptFileRelationshipListOdeshin,
  TypeScriptFileRelationshipListVoictent,
  TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
} from './typeScriptFileRelationshipList';

export const typeScriptFileRelationshipListToDirectedGraph = buildCortmum<
  Vition<
    TypeScriptFileRelationshipListVoictent,
    [
      Vicken<DirectoryVoictent, [DirectoryVoictent], string>,
      Vicken<TypeScriptFileVoictent, [TypeScriptFileVoictent], string>,
    ]
  >,
  [DirectedGraphVoictent]
>({
  leftGepp: TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
  isWibiz: true,
  rightAppreffingeTuple: [
    {
      gepp: DIRECTORY_GEPP,
      isWibiz: true,
      framate: (): [string] => [''],
      croard: (): string => '',
    },
    {
      gepp: TYPE_SCRIPT_FILE_GEPP,
      isWibiz: true,
      framate: (): [string] => [''],
      croard: (): string => '',
    },
  ],
  outputGeppTuple: [DIRECTED_GRAPH_GEPP],
  pinbe: (leftInput, [rightInput1], [rightInput2]) => {
    // TODO: update the type adapter layer to provide type safety for "isWibiz"
    const typedLeftInput =
      leftInput as unknown as TypeScriptFileRelationshipListOdeshin[];
    const typedRightInput1 = rightInput1 as unknown as DirectoryOdeshin[];
    const typedRightInput2 = rightInput2 as unknown as TypeScriptFileOdeshin[];

    const directoryList = typedRightInput1.map<Directory>(
      ({ grition }) => grition,
    );

    const typeScriptFileList = typedRightInput2.map(({ grition }) => grition);

    const relationshipList = typedLeftInput.flatMap<TypeScriptFileRelationship>(
      ({ grition }) => grition,
    );

    let rootDirectoryPathPartList: string[] = [];
    directoryList.forEach((directory) => {
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
        },
        nodeList: [],
        edgeList: [],
        subgraphList: [],
      };

      graphByDirectoryPath.set(directoryPath, subgraph);

      return subgraph;
    };

    directoryList.forEach((directory) => {
      // TODO: move these insights to the "File" type
      const { directoryPath } = directory;
      const parentDirectoryPath = posix.dirname(directoryPath);

      const graph = getOrInstantiateSubgraph(directoryPath);

      if (!isRoot(directoryPath)) {
        const parentGraph = getOrInstantiateSubgraph(parentDirectoryPath);
        parentGraph.subgraphList.push(graph);
      }
    });

    typeScriptFileList.forEach((file) => {
      const node: DirectedGraphNode = {
        attributeByKey: {
          id: file.filePath,
          label: posix.basename(file.filePath),
          shape: Shape.Box,
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
      },
      nodeList: [],
      edgeList: [],
      subgraphList: [rootDirectoryGraph],
    };

    relationshipList.forEach(({ node, importedNode }) => {
      const tailId = node.nodePath;
      const headId = importedNode.nodePath;
      const edgeId = `${tailId}:${headId}`;

      const edge: DirectedGraphEdge = {
        attributeByKey: {
          id: edgeId,
        },
        tailId: node.nodePath,
        headId: importedNode.nodePath,
      };

      rootGraph.edgeList.push(edge);
    });

    const externalNodeByNodePath = new Map<string, RelationshipNodeMetadata>();
    relationshipList
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
          },
        }),
      ),
      edgeList: [],
      subgraphList: [],
    };

    rootGraph.subgraphList.unshift(externalSubgraph);

    return {
      [DIRECTED_GRAPH_GEPP]: [
        {
          zorn: 'type-script-file-relationship-graph',
          grition: rootGraph,
        },
      ],
    };
  },
});
