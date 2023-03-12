import * as graphviz from 'ts-graphviz';
import { posix } from 'path';
import { Node } from 'ts-graphviz';
import childProcessUtilities from 'child_process';
import * as cheerio from 'cheerio';
import { fileUtilities } from '../../../utilities/debugger/fileUtilities';
import {
  getNodeId,
  RelationshipNodeMetadata,
  TypeScriptFileRelationshipListOdeshin,
  TypeScriptFileRelationshipListVoictent,
  TYPE_SCRIPT_FILE_RELATIONSHIP_LIST_GEPP,
} from './typeScriptFileRelationshipList';
import { buildDisatinger } from '../../../type-script-adapter/estinant/disatinger';
import {
  DirectoryOdeshin,
  DirectoryVoictent,
  DIRECTORY_GEPP,
} from '../file/directory';
import { Vition } from '../../../type-script-adapter/vition';
import { Vicken } from '../../../type-script-adapter/vicken';
import {
  TypeScriptFile,
  TypeScriptFileOdeshin,
  TypeScriptFileVoictent,
  TYPE_SCRIPT_FILE_GEPP,
} from '../type-script-file/typeScriptFile';
import { TypeScriptFileImportTypeName } from '../type-script-file/typeScriptFileImportList';

export const relationshipRendererWortinator = buildDisatinger<
  Vition<
    TypeScriptFileRelationshipListVoictent,
    [
      Vicken<DirectoryVoictent, [DirectoryVoictent], string>,
      Vicken<TypeScriptFileVoictent, [TypeScriptFileVoictent], string>,
    ]
  >
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
  pinbe: (leftInput, [rightInput1], [rightInput2]) => {
    // TODO: update the type adapter layer to provide type safety for "isWibiz"
    const collection =
      leftInput as unknown as TypeScriptFileRelationshipListOdeshin[];
    const directoryList = rightInput1 as unknown as DirectoryOdeshin[];
    const typeScriptFileList =
      rightInput2 as unknown as TypeScriptFileOdeshin[];

    const directoriesByParentDirectoryPath = new Map<string, Set<string>>();
    directoryList.forEach(({ grition: { directoryPath } }) => {
      const parentDirectoryPath = posix.dirname(directoryPath);
      const directorySet =
        directoriesByParentDirectoryPath.get(parentDirectoryPath) ?? new Set();
      directorySet.add(directoryPath);
      directoriesByParentDirectoryPath.set(parentDirectoryPath, directorySet);
    });

    const typeScriptFilesByParentDirectory = new Map<
      string,
      Set<TypeScriptFile>
    >();
    typeScriptFileList.forEach(({ grition: typeScriptFile }) => {
      const parentDirectoryPath = typeScriptFile.directoryPath;
      const fileSet =
        typeScriptFilesByParentDirectory.get(parentDirectoryPath) ?? new Set();
      fileSet.add(typeScriptFile);
      typeScriptFilesByParentDirectory.set(parentDirectoryPath, fileSet);
    });

    const inputList = collection.flatMap(
      ({ grition: importList }) => importList,
    );

    const allNodeList = inputList.flatMap(({ node, importedNode }) => [
      node,
      importedNode,
    ]);

    const externalNodeList = allNodeList.filter(
      (node) => node.typeName === TypeScriptFileImportTypeName.External,
    );

    // inputList
    //   .filter((node) => node.typeName === TypeScriptFileImportTypeName.Local)
    //   .directoryPath((node) => {});

    const nodesByDirectoryPath = new Map<
      string,
      Set<RelationshipNodeMetadata>
    >();
    const nodesByNodeId = new Map<string, RelationshipNodeMetadata>();

    const importMap = new Map<string, Set<RelationshipNodeMetadata>>();
    inputList.forEach(({ node, importedNode }) => {
      const importedSet = importMap.get(node.nodePath) ?? new Set();
      importedSet.add(importedNode);
      importMap.set(node.nodePath, importedSet);
    });

    // allNodeList.forEach((node) => {
    //   const cachedNode = nodesByNodeId.get(getNodeId(node)) ?? node;
    //   nodesByNodeId.set(getNodeId(node), cachedNode);

    //   if (cachedNode.directoryPath !== undefined) {
    //     const nodeSet =
    //       nodesByDirectoryPath.get(cachedNode.directoryPath) ?? new Set();
    //     nodeSet.add(cachedNode);
    //     nodesByDirectoryPath.set(cachedNode.directoryPath, nodeSet);
    //   }
    // });

    let rootDirectoryPath = '';
    [...directoriesByParentDirectoryPath.keys()].forEach((directoryPath) => {
      rootDirectoryPath =
        directoryPath.length < rootDirectoryPath.length ||
        rootDirectoryPath === ''
          ? directoryPath
          : rootDirectoryPath;
    });

    const rootGraph = (function buildGraph<
      TGraph extends graphviz.RootGraphModel | graphviz.SubgraphModel,
    >(directoryPath: string, graph: TGraph): TGraph {
      const fileSet = typeScriptFilesByParentDirectory.get(directoryPath);
      if (fileSet !== undefined) {
        fileSet.forEach((file) => {
          const nodeId = `Local:${file.filePath}`;

          graph.addNode(
            new Node(nodeId, {
              id: nodeId,
              label: posix.basename(file.filePath),
              // shape: 'rectangle',
              // style: 'rounded',
            }),
          );

          const importedSet = importMap.get(file.filePath);
          if (importedSet !== undefined) {
            [...importedSet.values()].forEach((importedNode) => {
              graph.addEdge(
                new graphviz.Edge(
                  [{ id: nodeId }, { id: getNodeId(importedNode) }],
                  {
                    // fillcolor: '#00000033',
                    // penwidth: '2',
                  },
                ),
              );
            });
          }
        });
      }

      // const nodeSet = nodesByDirectoryPath.get(directoryPath);
      // console.log(nodeSet);
      // if (nodeSet !== undefined) {
      //   nodeSet.forEach((node) => {
      //     graph.addNode(
      //       new Node(getNodeId(node), {
      //         id: getNodeId(node),
      //         label: posix.basename(node.nodePath),
      //         shape: 'rectangle',
      //       }),
      //     );

      //     const connectedSet = connectedIdsByFromId.get(
      //       getNodeId(node),
      //     ) as Set<string>;
      //     // graph.addEdge(
      //     //   new graphviz.Edge([
      //     //     { id: getNodeId(node) },
      //     //     ...[...connectedSet.values()].map((id) => ({ id })),
      //     //   ] as graphviz.EdgeTargetTuple),
      //     // );
      //   });
      // }

      const directorySet = directoriesByParentDirectoryPath.get(directoryPath);

      if (directorySet !== undefined) {
        directorySet.forEach((nestedDirectoryPath, index) => {
          const subgraph = new graphviz.Subgraph(`cluster_${index}`, {
            label: `${posix.basename(nestedDirectoryPath)}/`,
            labelloc: 't',

            // style: 'rounded',
          });
          graph.addSubgraph(subgraph);
          buildGraph(nestedDirectoryPath, subgraph);
        });
      }

      return graph;
    })(
      rootDirectoryPath,
      new graphviz.Digraph({
        clusterrank: 'local',
        rankdir: 'LR',
        fontname: 'sans-serif',
        label: `${rootDirectoryPath}/`,
        labelloc: 't',
        // style: 'rounded',
      }),
    );

    const externalSubgraph = new graphviz.Subgraph(`cluster_external`, {
      label: `external`,
      labelloc: 't',
    });

    rootGraph.addSubgraph(externalSubgraph);

    externalNodeList.forEach((node) => {
      externalSubgraph.addNode(
        new graphviz.Node(getNodeId(node), {
          id: getNodeId(node),
          label: node.nodePath,
          shape: 'rectangle',
        }),
      );
    });
    // const myGraph = graphviz.digraph(
    //   { clusterrank: 'local', label: rootDirectoryPath },
    //   (rootGraph) => {},
    // );

    // const graph = graphviz.digraph({ clusterrank: 'local' }, (g) => {
    //   const a = g.node('a');
    //   const b = g.node('b');
    //   // g.edge([a, b]);

    //   g.subgraph(
    //     'cluster_a',
    //     {
    //       label: 'my subgraph a',
    //     },
    //     (g1) => {
    //       const c = g1.node('c');
    //       const d = g1.node('d');

    //       g1.edge([c, d]);

    //       g1.subgraph('cluster_b', (g2) => {
    //         const e = g1.node('e');
    //         const f = g1.node('f');
    //         g1.edge([d, e, f]);
    //       });
    //     },
    //   );
    // });

    const graphCode = graphviz.toDot(rootGraph);
    // console.log(text);

    const { output } = childProcessUtilities.spawnSync('dot', ['-Tsvg'], {
      encoding: 'utf8',
      input: graphCode,
    });

    const graphHtml = output.join('\n');

    const $ = cheerio.load(graphHtml);
    // console.log($('svg').map(() => {}).length);

    const something = $('g').toArray();
    
    
    console.log(something.length);

    // console.log($('svg > g').html());
    // console.log('---');
    // console.log(stuff.output);

    const fileName = `typeScriptRelationships.svg`;
    fileUtilities.writeOutputFile(fileName, output.join('\n'));
  },
});
