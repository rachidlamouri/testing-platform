import { posix } from 'path';
import { buildCortmum } from '../../../type-script-adapter/estinant/cortmum';
import { Vicken } from '../../../type-script-adapter/vicken';
import { Vition } from '../../../type-script-adapter/vition';
import {
  CustomDirectedGraph,
  CustomDirectedGraphEdge,
  CustomDirectedGraphElementTypeName,
  CustomDirectedGraphNode,
  CustomDirectedGraphVoictent,
  CUSTOM_DIRECTED_GRAPH_GEPP,
} from '../custom-directed-graph/customDirectedGraph';
import {
  Directory,
  DirectoryOdeshin,
  DirectoryVoictent,
  DIRECTORY_GEPP,
} from '../file/directory';
import {
  GraphBoundaryHubblepup,
  GraphBoundaryVoictent,
  GRAPH_BOUNDARY_GEPP,
} from '../graph-boundary/graphBoundary';
import {
  TypeScriptFileOdeshin,
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import { TypeScriptFileImportTypeName } from '../type-script-file/typeScriptFileImportList';
import {
  TypeScriptFileRelationship,
  TypeScriptFileRelationshipListOdeshin,
  TypeScriptFileRelationshipListVoictent,
  TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
} from './typeScriptFileRelationshipList';

export const typeScriptFileRelationshipListToCustomGraph = buildCortmum<
  Vition<
    TypeScriptFileRelationshipListVoictent,
    [
      Vicken<DirectoryVoictent, [DirectoryVoictent], string>,
      Vicken<TypeScriptFileVoictent, [TypeScriptFileVoictent], string>,
      Vicken<GraphBoundaryVoictent, [GraphBoundaryVoictent], string>,
    ]
  >,
  [CustomDirectedGraphVoictent]
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
    {
      gepp: GRAPH_BOUNDARY_GEPP,
      isWibiz: true,
      framate: (): [string] => [''],
      croard: (): string => '',
    },
  ],
  outputGeppTuple: [CUSTOM_DIRECTED_GRAPH_GEPP],
  pinbe: (leftInput, [rightInput1], [rightInput2], [rightInput3]) => {
    // #region Inputs
    // TODO: update the type adapter layer to provide type safety for "isWibiz"
    const typedLeftInput =
      leftInput as unknown as TypeScriptFileRelationshipListOdeshin[];
    const typedRightInput1 = rightInput1 as unknown as DirectoryOdeshin[];
    const typedRightInput2 = rightInput2 as unknown as TypeScriptFileOdeshin[];
    const graphBoundaryList =
      rightInput3 as unknown as GraphBoundaryHubblepup[];

    const directoryList = typedRightInput1.map<Directory>(
      ({ grition }) => grition,
    );

    const typeScriptFileList = typedRightInput2.map(({ grition }) => grition);

    const relationshipList = typedLeftInput.flatMap<TypeScriptFileRelationship>(
      ({ grition }) => grition,
    );
    // #endregion

    // #region Subgraph Maps
    const allSubgraphById = new Map<string, CustomDirectedGraph>();
    const boundarySubgraphById = new Map<string, CustomDirectedGraph>();
    // #endregion

    // #region Root Graph
    const rootGraph: CustomDirectedGraph = {
      typeName: CustomDirectedGraphElementTypeName.Graph,
      id: '',
      label: 'TypeScript File Relationships',
      nodeList: [],
      edgeList: [],
      subgraphList: [],
    };
    // #endregion

    // #region Root Directory Subgraph
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
    const isRootDirectoryPath = (directoryPath: string): boolean =>
      directoryPath === rootDirectoryPath;
    const rootDirectoryGraph: CustomDirectedGraph = {
      typeName: CustomDirectedGraphElementTypeName.Graph,
      id: rootDirectoryPath,
      label: rootDirectoryPath,
      nodeList: [],
      edgeList: [],
      subgraphList: [],
    };

    rootGraph.subgraphList.push(rootDirectoryGraph);
    allSubgraphById.set(rootDirectoryPath, rootDirectoryGraph);
    // #endregion

    // #region Boundary Subgraphs
    const boundarySubgraphList = graphBoundaryList.map<CustomDirectedGraph>(
      (graphBoundary) => {
        return {
          typeName: CustomDirectedGraphElementTypeName.Graph,
          id: graphBoundary.directoryPath,
          label: posix.relative(rootDirectoryPath, graphBoundary.directoryPath),
          nodeList: [],
          edgeList: [],
          subgraphList: [],
        };
      },
    );

    boundarySubgraphList.forEach((subgraph) => {
      allSubgraphById.set(subgraph.id, subgraph);
      boundarySubgraphById.set(subgraph.id, subgraph);
      rootDirectoryGraph.subgraphList.push(subgraph);
    });
    // #endregion

    // #region External Subgraph
    const externalSubgraph: CustomDirectedGraph = {
      typeName: CustomDirectedGraphElementTypeName.Graph,
      id: 'node_modules',
      label: 'node_modules',
      nodeList: relationshipList
        .map(({ importedNode }) => importedNode)
        .filter(
          (importedNode) =>
            importedNode.typeName === TypeScriptFileImportTypeName.External,
        )
        .map<CustomDirectedGraphNode>((importedNode) => ({
          typeName: CustomDirectedGraphElementTypeName.Node,
          id: importedNode.nodePath,
          label: importedNode.nodePath,
        })),
      edgeList: [],
      subgraphList: [],
    };

    rootGraph.subgraphList.push(externalSubgraph);
    // #endregion

    // #region Non-boundary Subgraphs
    const nonBoundaryList = directoryList
      .filter((directory) => !boundarySubgraphById.has(directory.directoryPath))
      .map((directory) => {
        const subgraph: CustomDirectedGraph = {
          typeName: CustomDirectedGraphElementTypeName.Graph,
          id: directory.directoryPath,
          label: posix.basename(directory.directoryPath),
          nodeList: [],
          edgeList: [],
          subgraphList: [],
        };

        const { directoryPath } = directory;

        return {
          directoryPath,
          subgraph,
        };
      });

    nonBoundaryList.forEach(({ subgraph }) => {
      allSubgraphById.set(subgraph.id, subgraph);
    });

    nonBoundaryList.forEach(({ subgraph, directoryPath }) => {
      if (!isRootDirectoryPath(directoryPath)) {
        const parentDirectoryPath = posix.dirname(directoryPath);
        const parentSubgraph = allSubgraphById.get(
          parentDirectoryPath,
        ) as CustomDirectedGraph;
        parentSubgraph.subgraphList.push(subgraph);
      }
    });
    // #endregion

    // #region Nodes
    typeScriptFileList.forEach((file) => {
      const node: CustomDirectedGraphNode = {
        typeName: CustomDirectedGraphElementTypeName.Node,
        id: file.filePath,
        label: posix.basename(file.filePath),
      };

      const subgraph = allSubgraphById.get(
        file.directoryPath,
      ) as CustomDirectedGraph;
      subgraph.nodeList.push(node);
    });
    // #endregion

    // #region Edges
    relationshipList.forEach((relationship) => {
      const tailId = relationship.importedNode.nodePath;
      const headId = relationship.node.nodePath;

      const edgeId = `${tailId}:${headId}`;

      const edge: CustomDirectedGraphEdge = {
        typeName: CustomDirectedGraphElementTypeName.Edge,
        id: edgeId,
        tailId,
        headId,
      };

      rootGraph.edgeList.push(edge);
    });
    // #endregion

    return {
      [CUSTOM_DIRECTED_GRAPH_GEPP]: [
        {
          zorn: 'type-script-file-relationship-graph',
          grition: rootGraph,
        },
      ],
    };
  },
});
