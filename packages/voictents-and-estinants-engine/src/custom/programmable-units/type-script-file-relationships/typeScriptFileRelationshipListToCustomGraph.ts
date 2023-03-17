import { posix } from 'path';
import * as uuid from 'uuid';
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
  RelationshipNodeMetadata,
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

    const externalModuleNameSet = new Set(
      relationshipList
        .map(({ importedNode }) => importedNode)
        .filter(
          (importedNode) =>
            importedNode.typeName === TypeScriptFileImportTypeName.External,
        )
        .map((importedNode) => importedNode.nodePath),
    );
    // #endregion

    // #region Root Directory Path
    let rootDirectoryPathPartList: string[] = [];
    directoryList.forEach((directory) => {
      const isShorter =
        directory.directoryPathPartList.length <
        rootDirectoryPathPartList.length;

      const isRootSet = rootDirectoryPathPartList.length > 0;

      if (isShorter || !isRootSet) {
        rootDirectoryPathPartList = directory.directoryPathPartList;
      }
    });

    // TODO: move this join to a utility
    const rootDirectoryPath = rootDirectoryPathPartList.join('/');
    // #endregion

    // #region GraphElementSource
    type GraphElementSource = {
      id: string;
      getParentId: () => string;
      getLabel: () => string;
    };

    type BoundaryImportsExportsGroup = {
      boundaryId: string;
      importsSource: GraphElementSource;
      exportsSource: GraphElementSource;
    };

    const rootSource: GraphElementSource = {
      id: uuid.v4(),
      getParentId: () => '',
      getLabel: () => 'TypeScript File Relationships',
    };

    const internalBoundarySourceAndDirectoryPathList = graphBoundaryList.map(
      ({ directoryPath }) => {
        const boundarySource: GraphElementSource = {
          id: uuid.v4(),
          getParentId: (): string => rootSource.id,
          getLabel: (): string =>
            posix.relative(rootDirectoryPath, directoryPath),
        };

        return {
          directoryPath,
          boundarySource,
        };
      },
    );

    const internalBoundaryIdByDirectoryPath = new Map<string, string>();
    internalBoundarySourceAndDirectoryPathList.forEach(
      ({ directoryPath, boundarySource }) => {
        internalBoundaryIdByDirectoryPath.set(directoryPath, boundarySource.id);
      },
    );

    const externalBoundarySource: GraphElementSource = {
      id: uuid.v4(),
      getParentId: (): string => rootSource.id,
      getLabel: (): string => 'node_modules',
    };

    const boundaryImportsExportsGroupList = [
      ...internalBoundarySourceAndDirectoryPathList.map(
        ({ boundarySource }) => boundarySource,
      ),
      externalBoundarySource,
    ].map<BoundaryImportsExportsGroup>((boundarySource) => {
      const importsSource: GraphElementSource = {
        id: uuid.v4(),
        getParentId: () => boundarySource.id,
        getLabel: () => '*Imports*',
      };

      const exportsSource: GraphElementSource = {
        id: uuid.v4(),
        getParentId: () => boundarySource.id,
        getLabel: () => '*Exports*',
      };

      return {
        boundaryId: boundarySource.id,
        importsSource,
        exportsSource,
      };
    });

    const boundaryImportsExportsGroupByBoundaryId = new Map<
      string,
      BoundaryImportsExportsGroup
    >();
    boundaryImportsExportsGroupList.forEach((group) => {
      boundaryImportsExportsGroupByBoundaryId.set(group.boundaryId, group);
    });

    const isBoundary = (directoryPath: string): boolean => {
      return internalBoundaryIdByDirectoryPath.has(directoryPath);
    };

    const directoryIdByDirectoryPath = new Map<string, string>();

    const directorySourceAndDirectoryPathList = directoryList.map(
      (directory) => {
        const source = {
          id: uuid.v4(),
          getParentId: (): string => {
            let parentId: string;
            if (isBoundary(directory.directoryPath)) {
              parentId = internalBoundaryIdByDirectoryPath.get(
                directory.directoryPath,
              ) as string;
            } else {
              const parentDirectoryPath = posix.dirname(
                directory.directoryPath,
              );
              parentId = directoryIdByDirectoryPath.get(
                parentDirectoryPath,
              ) as string;
            }

            return parentId;
          },
          getLabel: (): string => {
            const label = isBoundary(directory.directoryPath)
              ? ''
              : posix.basename(directory.directoryPath);

            return label;
          },
        };

        return {
          directoryPath: directory.directoryPath,
          source,
        };
      },
    );

    directorySourceAndDirectoryPathList.forEach(({ directoryPath, source }) => {
      directoryIdByDirectoryPath.set(directoryPath, source.id);
    });

    const internalModuleSourceAndFilePathList = typeScriptFileList.map(
      (typeScriptFile) => {
        const source: GraphElementSource = {
          id: uuid.v4(),
          getParentId: (): string => {
            const directoryId = directoryIdByDirectoryPath.get(
              typeScriptFile.directoryPath,
            ) as string;
            return directoryId;
          },
          getLabel: (): string => posix.basename(typeScriptFile.filePath),
        };

        const { filePath } = typeScriptFile;

        return {
          source,
          filePath,
        };
      },
    );

    const internalModuleIdByFilePath = new Map<string, string>();
    internalModuleSourceAndFilePathList.forEach(({ filePath, source }) => {
      internalModuleIdByFilePath.set(filePath, source.id);
    });

    const externalModuleSourceAndModuleNameList = [
      ...externalModuleNameSet,
    ].map((moduleName) => {
      const source: GraphElementSource = {
        id: uuid.v4(),
        getParentId: (): string => externalBoundarySource.id,
        getLabel: (): string => moduleName,
      };

      return {
        moduleName,
        source,
      };
    });

    const externalModuleIdByModuleName = new Map<string, string>();
    externalModuleSourceAndModuleNameList.forEach(({ moduleName, source }) => {
      externalModuleIdByModuleName.set(moduleName, source.id);
    });

    const getModuleId = (
      metadata: RelationshipNodeMetadata,
    ): string | undefined => {
      if (metadata.typeName === TypeScriptFileImportTypeName.Local) {
        return internalModuleIdByFilePath.get(metadata.nodePath);
      }

      return externalModuleIdByModuleName.get(metadata.nodePath);
    };

    const getBoundaryId = (metadata: RelationshipNodeMetadata): string => {
      if (metadata.typeName === TypeScriptFileImportTypeName.Local) {
        const boundaryDirectoryPath = graphBoundaryList
          .map(({ directoryPath }) => directoryPath)
          .find((directoryPath) =>
            metadata.nodePath.startsWith(directoryPath),
          ) as string;

        const boundaryId = internalBoundaryIdByDirectoryPath.get(
          boundaryDirectoryPath,
        ) as string;
        return boundaryId;
      }

      return externalBoundarySource.id;
    };

    const boundedRelationshipList = relationshipList.map((relationship) => {
      const exportingModuleMetadata = relationship.importedNode;
      const exportingModuleId = getModuleId(exportingModuleMetadata);
      const exportingBoundaryId = getBoundaryId(exportingModuleMetadata);

      const importingModuleMetadata = relationship.node;
      const importingModuleId = getModuleId(importingModuleMetadata);
      const importingBoundaryId = getBoundaryId(importingModuleMetadata);

      return {
        exportingModuleMetadata,
        exportingModuleId,
        exportingBoundaryId,
        importingModuleMetadata,
        importingModuleId,
        importingBoundaryId,
      };
    });

    const crossBoundaryRelationshipList = boundedRelationshipList.filter(
      ({ exportingBoundaryId, importingBoundaryId }) =>
        exportingBoundaryId !== importingBoundaryId,
    );

    const exportingProxySourceByExportingModuleId = new Map<
      string,
      GraphElementSource
    >();
    crossBoundaryRelationshipList.forEach(
      ({ exportingModuleMetadata, exportingModuleId, exportingBoundaryId }) => {
        const exportingProxySource: GraphElementSource =
          exportingProxySourceByExportingModuleId.get(exportingModuleId) ?? {
            id: uuid.v4(),
            getParentId: (): string =>
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              boundaryImportsExportsGroupByBoundaryId.get(exportingBoundaryId)!
                .exportsSource.id,
            getLabel: () => posix.basename(exportingModuleMetadata.nodePath),
          };

        exportingProxySourceByExportingModuleId.set(
          exportingModuleId,
          exportingProxySource,
        );
      },
    );

    const importingProxySourceByExportingModuleId = new Map<
      string,
      GraphElementSource
    >();
    crossBoundaryRelationshipList.forEach(
      ({ exportingModuleMetadata, importingBoundaryId, exportingModuleId }) => {
        const importingProxySource: GraphElementSource =
          importingProxySourceByExportingModuleId.get(exportingModuleId) ?? {
            id: uuid.v4(),
            getParentId: (): string =>
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              boundaryImportsExportsGroupByBoundaryId.get(importingBoundaryId)!
                .importsSource.id,
            getLabel: () => posix.basename(exportingModuleMetadata.nodePath),
          };

        importingProxySourceByExportingModuleId.set(
          exportingModuleId,
          importingProxySource,
        );
      },
    );

    const edgeMetadataList = boundedRelationshipList.flatMap(
      ({
        exportingModuleMetadata,
        importingModuleMetadata,
        exportingModuleId,
        exportingBoundaryId,
        importingModuleId,
        importingBoundaryId,
      }) => {
        if (exportingBoundaryId === importingBoundaryId) {
          if (
            exportingModuleId === undefined ||
            importingModuleId === undefined
          ) {
            console.log(exportingModuleId);
            console.log(exportingModuleMetadata);
            console.log(importingModuleId);
            console.log(importingModuleMetadata);
            throw Error('whoops');
          }

          return [
            {
              tailId: exportingModuleId,
              headId: importingModuleId,
            },
          ];
        }

        const exportingProxySource =
          exportingProxySourceByExportingModuleId.get(
            exportingModuleId,
          ) as GraphElementSource;
        const importingProxySource =
          importingProxySourceByExportingModuleId.get(
            exportingModuleId,
          ) as GraphElementSource;

        return [
          {
            tailId: exportingModuleId,
            headId: exportingProxySource.id,
          },
          {
            tailId: exportingProxySource.id,
            headId: importingProxySource.id,
          },
          {
            tailId: importingProxySource.id,
            headId: importingModuleId,
          },
        ];
      },
    );

    const getCustomDirectedGraph = (
      source: GraphElementSource,
    ): CustomDirectedGraph => {
      return {
        typeName: CustomDirectedGraphElementTypeName.Graph,
        id: source.id,
        label: source.getLabel(),
        nodeList: [],
        edgeList: [],
        subgraphList: [],
      };
    };

    const getCustomDirectedNode = (
      source: GraphElementSource,
    ): CustomDirectedGraphNode => {
      return {
        typeName: CustomDirectedGraphElementTypeName.Node,
        id: source.id,
        label: source.getLabel(),
      };
    };

    const subgraphById = new Map<string, CustomDirectedGraph>();

    const rootGraph = getCustomDirectedGraph(rootSource);

    internalBoundarySourceAndDirectoryPathList.forEach(({ boundarySource }) => {
      const subgraph = getCustomDirectedGraph(boundarySource);

      subgraphById.set(subgraph.id, subgraph);
      rootGraph.subgraphList.push(subgraph);
    });

    const externalSubgraph = getCustomDirectedGraph(externalBoundarySource);
    subgraphById.set(externalSubgraph.id, externalSubgraph);
    rootGraph.subgraphList.push(externalSubgraph);

    boundaryImportsExportsGroupList.forEach((group) => {
      const exportsSubgraph = getCustomDirectedGraph(group.exportsSource);
      const importsSubgraph = getCustomDirectedGraph(group.importsSource);

      const parentGraph = subgraphById.get(
        group.boundaryId,
      ) as CustomDirectedGraph;

      subgraphById.set(exportsSubgraph.id, exportsSubgraph);
      subgraphById.set(importsSubgraph.id, importsSubgraph);

      parentGraph.subgraphList.push(exportsSubgraph);
      parentGraph.subgraphList.push(importsSubgraph);
    });

    directorySourceAndDirectoryPathList.forEach(({ source }) => {
      const subgraph = getCustomDirectedGraph(source);
      subgraphById.set(subgraph.id, subgraph);
    });

    directorySourceAndDirectoryPathList.forEach(({ directoryPath, source }) => {
      const subgraph = subgraphById.get(source.id) as CustomDirectedGraph;

      if (directoryPath !== rootDirectoryPath) {
        const parentId = source.getParentId();
        const parentSubgraph = subgraphById.get(
          parentId,
        ) as CustomDirectedGraph;
        parentSubgraph.subgraphList.push(subgraph);
      }
    });

    internalModuleSourceAndFilePathList.forEach(({ source }) => {
      const node = getCustomDirectedNode(source);
      const parentId = source.getParentId();
      const parentSubgraph = subgraphById.get(parentId) as CustomDirectedGraph;

      parentSubgraph.nodeList.push(node);
    });

    externalModuleSourceAndModuleNameList.forEach(({ source }) => {
      const node = getCustomDirectedNode(source);
      const parentId = source.getParentId();
      const parentSubgraph = subgraphById.get(parentId) as CustomDirectedGraph;

      parentSubgraph.nodeList.push(node);
    });

    [...exportingProxySourceByExportingModuleId.values()].forEach((source) => {
      const node = getCustomDirectedNode(source);
      const parentId = source.getParentId();
      const parentSubgraph = subgraphById.get(parentId) as CustomDirectedGraph;

      parentSubgraph.nodeList.push(node);
    });

    [...importingProxySourceByExportingModuleId.values()].forEach((source) => {
      const node = getCustomDirectedNode(source);
      const parentId = source.getParentId();
      const parentSubgraph = subgraphById.get(parentId) as CustomDirectedGraph;

      parentSubgraph.nodeList.push(node);
    });

    const edgeById = new Map<string, CustomDirectedGraphEdge>();
    edgeMetadataList.forEach((edgeMetadata) => {
      const edgeId = `${edgeMetadata.tailId}:${edgeMetadata.headId}`;

      const edge: CustomDirectedGraphEdge = edgeById.get(edgeId) ?? {
        typeName: CustomDirectedGraphElementTypeName.Edge,
        id: edgeId,
        tailId: edgeMetadata.tailId,
        headId: edgeMetadata.headId,
      };

      edgeById.set(edgeId, edge);
    });

    [...edgeById.values()].forEach((edge) => {
      rootGraph.edgeList.push(edge);
    });

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
