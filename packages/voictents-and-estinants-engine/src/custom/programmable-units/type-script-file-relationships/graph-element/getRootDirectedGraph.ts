import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTORY_GEPP,
  Directory,
  DirectoryVoictent,
} from '../../file/directory';
import { Shape } from '../../graph-visualization/directed-graph/attribute';
import {
  DirectedGraphVoictent,
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
  DirectedSubgraph,
} from '../../graph-visualization/directed-graph/directedGraph';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/directedGraphNode';
import {
  TYPE_SCRIPT_FILE_GEPP,
  TypeScriptFile,
  TypeScriptFileVoictent,
} from '../../type-script-file/typeScriptFile';
import { TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN } from '../typeScriptFileRelationshipGraphZorn';
import {
  DirectorySubgraphAttributeByKeyVoictent,
  DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  getSubgraphId,
} from './directorySubgraphAttributeByKey';
import {
  FileNodeAttributeByKeyVoictent,
  FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
} from './fileNodeAttributeByKey';
import {
  ImportRelationshipEdgeVoictent,
  IMPORT_RELATIONSHIP_EDGE_GEPP,
} from './importRelationshipEdge';

export const getRootDirectedGraph = buildEstinant('getRootDirectedGraph')
  .fromOdeshinVoictent<FileNodeAttributeByKeyVoictent>({
    gepp: FILE_NODE_ATTRIBUTE_BY_KEY_GEPP,
  })
  .andFromOdeshinVoictent<DirectorySubgraphAttributeByKeyVoictent>({
    gepp: DIRECTORY_SUBGRAPH_ATTRIBUTE_BY_KEY_GEPP,
  })
  .andFromOdeshinVoictent<ImportRelationshipEdgeVoictent>({
    gepp: IMPORT_RELATIONSHIP_EDGE_GEPP,
  })
  .andFromOdeshinVoictent<DirectoryVoictent>({
    gepp: DIRECTORY_GEPP,
  })
  .andFromOdeshinVoictent<TypeScriptFileVoictent>({
    gepp: TYPE_SCRIPT_FILE_GEPP,
  })
  .toHubblepup<DirectedGraphVoictent>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .onPinbe(
    (
      fileNodeAttributeByKeyList,
      directorySubgraphAttributeByKeyList,
      importRelationshipEdgeList,
      directoryList,
      typeScriptFileList,
    ) => {
      const subgraphList = directorySubgraphAttributeByKeyList.map(
        (attributeByKey) => {
          return {
            isRoot: false,
            attributeByKey,
            nodeList: [],
            edgeList: [],
            subgraphList: [],
          } satisfies DirectedSubgraph;
        },
      );

      const subgraphById = new Map<string, DirectedSubgraph>();
      subgraphList.forEach((subgraph) => {
        subgraphById.set(subgraph.attributeByKey.id, subgraph);
      });

      const directoryByDirectoryPath = new Map<string, Directory>();
      directoryList.forEach((directory) => {
        directoryByDirectoryPath.set(directory.directoryPath, directory);
      });

      const typeScriptFileByInstanceId = new Map<string, TypeScriptFile>();
      typeScriptFileList.forEach((typeScriptFile) => {
        typeScriptFileByInstanceId.set(
          typeScriptFile.instanceId,
          typeScriptFile,
        );
      });

      fileNodeAttributeByKeyList.forEach((attributeByKey) => {
        const node: DirectedGraphNode = {
          attributeByKey: {
            ...attributeByKey,
            shape: Shape.Box,
          },
        };

        const typeScriptFile = typeScriptFileByInstanceId.get(
          node.attributeByKey.id,
        );
        const directory = directoryByDirectoryPath.get(
          typeScriptFile.directoryPath,
        );
        const subgraphId = getSubgraphId(directory);
        const subgraph = subgraphById.get(subgraphId);

        if (!subgraph) {
          console.log(node.attributeByKey.id);
          console.log(typeScriptFile?.filePath);
          console.log(directory?.directoryPath);
          console.log();
        }

        subgraph?.nodeList?.push(node);
      });

      const root: DirectedGraph = {
        isRoot: true,
        attributeByKey: {
          label: 'Root',
        },
        nodeList: [],
        edgeList: importRelationshipEdgeList,
        subgraphList,
      };

      return {
        zorn: TYPE_SCRIPT_FILE_RELATIONSHIP_GRAPH_ZORN,
        grition: root,
      };
    },
  )
  .assemble();
