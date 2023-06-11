import { buildEstinant } from '../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
  DirectedGraphVoque,
} from './graph-visualization/directed-graph/directedGraph';
import {
  DirectedGraphNode,
  NodeShape,
} from './graph-visualization/directed-graph/directedGraphNode';
import {
  COMMON_ATTRIBUTE_BY_KEY,
  FONT_SIZE,
} from './type-script-file-relationships/graph-element/commonAttributeByKey';
import {
  DirectedGraphEdge,
  EdgeStyle,
} from './graph-visualization/directed-graph/directedGraphEdge';
import {
  ENGINE_PROGRAM_2_GEPP,
  EngineProgram2Voque,
} from './engine-program/engineProgram2';
import { getTextDigest } from '../../utilities/getTextDigest';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataById,
  DirectedGraphMetadataByIdVoque,
  DirectedGraphMetadatumField,
} from './graph-visualization/directedGraphMetadataById';
import { isNotNull } from '../../utilities/isNotNull';
import {
  DirectedCluster,
  DirectedSubgraph,
  RankType,
} from './graph-visualization/directed-graph/directedSubgraph';
import {
  GraphLikeStyle,
  GraphLikeLabelLocation,
} from './graph-visualization/directed-graph/attributeByKeyGSC';
import {
  mutateDirectedGraphMetadataById,
  mutateGraphLikeElementListOrder,
} from './type-script-file-relationships/graph-element/mutateGraphLikeElementListOrder';

type EngineVoictent = {
  id: string;
  name: string;
  hasInitialInput: boolean;
  isConsumed: boolean;
  commentText: string;
};

/**
 * Converts an engine program into a directed graph and the associated metadata
 * to be displayed in the interactive directed graph.
 */
export const getDirectedGraph = buildEstinant({
  name: 'getDirectedGraph',
})
  .fromHubblepup2<EngineProgram2Voque>({
    gepp: ENGINE_PROGRAM_2_GEPP,
  })
  .toHubblepup2<DirectedGraphVoque>({
    gepp: DIRECTED_GRAPH_GEPP,
  })
  .toHubblepup2<DirectedGraphMetadataByIdVoque>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  })
  .onPinbe((engineProgram) => {
    // TODO: index program name?
    const associationId = engineProgram.programName;

    const engineVoqueByName = new Map(
      engineProgram.allVoqueList.map((voque) => {
        return [voque.displayName, voque];
      }),
    );

    const engineVoictentByName = new Map<string, EngineVoictent>(
      engineProgram.voictentLocatorList.map((voictentLocator) => {
        return [
          voictentLocator.name,
          {
            id: getTextDigest(voictentLocator.name),
            name: voictentLocator.name,
            hasInitialInput: voictentLocator.hasInitialInput,
            isConsumed: false,
            commentText:
              engineVoqueByName.get(voictentLocator.name)?.commentText ?? '',
          },
        ];
      }),
    );

    engineProgram.estinantList.forEach((estinant) => {
      estinant.inputList.forEach((input) => {
        const cacheValue: EngineVoictent = engineVoictentByName.get(
          input.voictentName,
        ) ?? {
          id: getTextDigest(input.voictentName),
          name: input.voictentName,
          hasInitialInput: false,
          isConsumed: false,
          commentText:
            engineVoqueByName.get(input.voictentName)?.commentText ?? '',
        };

        cacheValue.isConsumed = true;

        engineVoictentByName.set(input.voictentName, cacheValue);
      });

      estinant.outputList.forEach((output) => {
        const cacheValue: EngineVoictent = engineVoictentByName.get(
          output.voictentName,
        ) ?? {
          id: getTextDigest(output.voictentName),
          name: output.voictentName,
          hasInitialInput: false,
          isConsumed: false,
          commentText:
            engineVoqueByName.get(output.voictentName)?.commentText ?? '',
        };

        engineVoictentByName.set(output.voictentName, cacheValue);
      });
    });

    const startNode: DirectedGraphNode = {
      attributeByKey: {
        id: getTextDigest(`start-node | ${engineProgram.programName}`),
        label: 'START',
        shape: NodeShape.Circle,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    };

    const voictentList = [...engineVoictentByName.values()];

    const startingEdgeList = voictentList
      .filter((voictent) => voictent.hasInitialInput)
      .map((voictent) => {
        const tailId = startNode.attributeByKey.id;
        const headId = voictent.id;

        const edge: DirectedGraphEdge = {
          tailId,
          headId,
          attributeByKey: {
            id: `${tailId}:${headId}`,
          },
        };

        return edge;
      });

    enum VoictentCategoryName {
      Start = 'Start',
      Middle = 'Middle',
      End = 'End',
    }

    type CategorizedVoictent = {
      category: VoictentCategoryName;
      voictent: EngineVoictent;
    };

    const categorizedVoictentList = voictentList.map<CategorizedVoictent>(
      (voictent) => {
        if (voictent.hasInitialInput) {
          return {
            category: VoictentCategoryName.Start,
            voictent,
          };
        }

        if (voictent.isConsumed) {
          return {
            category: VoictentCategoryName.Middle,
            voictent,
          };
        }

        return {
          category: VoictentCategoryName.End,
          voictent,
        };
      },
    );

    const startingVoictentList: EngineVoictent[] = categorizedVoictentList
      .filter(({ category }) => category === VoictentCategoryName.Start)
      .map(({ voictent }) => voictent);

    const middleVoictentList: EngineVoictent[] = categorizedVoictentList
      .filter(({ category }) => category === VoictentCategoryName.Middle)
      .map(({ voictent }) => voictent);

    const endingVoictentList: EngineVoictent[] = categorizedVoictentList
      .filter(({ category }) => category === VoictentCategoryName.End)
      .map(({ voictent }) => voictent);

    const createVoictentNode = (
      voictent: EngineVoictent,
    ): DirectedGraphNode => {
      const node: DirectedGraphNode = {
        attributeByKey: {
          id: voictent.id,
          label: voictent.name,
          shape: NodeShape.Box,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
      };

      return node;
    };

    const startingVoictentNodeList =
      startingVoictentList.map(createVoictentNode);
    const middleVoictentNodeList = middleVoictentList.map(createVoictentNode);
    const endingVoictentNodeList = endingVoictentList.map(createVoictentNode);

    const estinantSubgraphMetadataList = engineProgram.estinantList.map(
      (estinant) => {
        const inputSubgraph: DirectedSubgraph = {
          isRoot: false,
          isCluster: false,
          attributeByKey: {
            id: getTextDigest(
              `estinant-input-subgraph | ${estinant.estinantName}`,
            ),
            rank: RankType.Same,
          },
          nodeList: [],
          edgeList: [],
          subgraphList: [],
        };

        const estinantSubgraph: DirectedSubgraph = {
          isRoot: false,
          isCluster: false,
          attributeByKey: {
            id: getTextDigest(`estinant-subgraph | ${estinant.estinantName}`),
          },
          nodeList: [],
          edgeList: [],
          subgraphList: [inputSubgraph],
        };

        return {
          estinantId: estinant.id,
          estinantSubgraph,
          inputSubgraph,
        };
      },
    );

    const estinantSubgraphByEstinantId = new Map(
      estinantSubgraphMetadataList.map((subgraphMetadata) => {
        return [subgraphMetadata.estinantId, subgraphMetadata];
      }),
    );

    engineProgram.estinantList.forEach((estinant) => {
      const node: DirectedGraphNode = {
        attributeByKey: {
          id: estinant.id,
          label: estinant.estinantName,
          shape: NodeShape.InvertedHouse,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const subgraph = estinantSubgraphByEstinantId.get(
        estinant.id,
      )!.estinantSubgraph;

      subgraph.nodeList.push(node);
    });

    const estinantInputMetadataList = engineProgram.estinantList.flatMap(
      (estinant) => {
        return estinant.inputList.map((input) => {
          return {
            estinant,
            input,
          };
        });
      },
    );

    estinantInputMetadataList.forEach(({ estinant, input }) => {
      const node: DirectedGraphNode = {
        attributeByKey: {
          id: input.id,
          label: input.index === 0 ? 'L' : `R${input.index}`,
          shape: NodeShape.InvertedTriangle,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const subgraph = estinantSubgraphByEstinantId.get(
        estinant.id,
      )!.inputSubgraph;

      subgraph.nodeList.push(node);
    });

    const endNode: DirectedGraphNode = {
      attributeByKey: {
        id: getTextDigest(`end-node | ${engineProgram.programName}`),
        label: 'END',
        shape: NodeShape.Circle,
        color: 'gray',
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    };

    const inputEdgeList = engineProgram.estinantList.flatMap((estinant) => {
      const reverseInputList = [...estinant.inputList].reverse();

      return reverseInputList.flatMap((input) => {
        const inputVoictent = engineVoictentByName.get(
          input.voictentName,
        ) as EngineVoictent;

        const tailId1 = inputVoictent.id;
        const headId1 = input.id;
        const edgeId1 = `${tailId1}:${headId1}`;

        const edge1: DirectedGraphEdge = {
          tailId: tailId1,
          headId: headId1,
          attributeByKey: {
            id: edgeId1,
          },
        };

        const tailId2 = input.id;
        const headId2 = estinant.id;
        const edgeId2 = `${tailId2}:${headId2}`;

        const edge2: DirectedGraphEdge = {
          tailId: tailId2,
          headId: headId2,
          attributeByKey: {
            id: edgeId2,
          },
        };

        return [edge1, edge2];
      });
    });

    const outputEdgeList: DirectedGraphEdge[] =
      engineProgram.estinantList.flatMap((estinant) => {
        return estinant.outputList.map((output) => {
          const outputVoictent = engineVoictentByName.get(
            output.voictentName,
          ) as EngineVoictent;

          const tailId = estinant.id;
          const headId = outputVoictent.id;

          const edge: DirectedGraphEdge = {
            tailId,
            headId,
            attributeByKey: {
              id: `${tailId}:${headId}`,
            },
          };

          return edge;
        });
      });

    const voictentToEndEdgeList = voictentList
      .filter((voictent) => !voictent.isConsumed)
      .map<DirectedGraphEdge>((voictent) => {
        const tailId = voictent.id;
        const headId = endNode.attributeByKey.id;

        const edge: DirectedGraphEdge = {
          tailId,
          headId,
          attributeByKey: {
            id: `${tailId}:${headId}`,
          },
        };

        return edge;
      });

    const estinantToEndEdgeList = engineProgram.estinantList
      .filter((estinant) => {
        return estinant.outputList.length === 0;
      })
      .map((estinant) => {
        const tailId = estinant.id;
        const headId = endNode.attributeByKey.id;

        const edge: DirectedGraphEdge = {
          tailId,
          headId,
          attributeByKey: {
            id: `${tailId}:${headId}`,
          },
        };

        return edge;
      });

    const startSubgraph: DirectedCluster = {
      isRoot: false,
      isCluster: true,
      attributeByKey: {
        id: getTextDigest(`start-subgraph | ${engineProgram.programName}`),
        label: '',
        style: GraphLikeStyle.Rounded,
        color: 'none',
      },
      nodeList: startingVoictentNodeList,
      edgeList: [],
      subgraphList: [],
    };

    const endSubgraph: DirectedCluster = {
      isRoot: false,
      isCluster: true,
      attributeByKey: {
        id: getTextDigest(`end-subgraph | ${engineProgram.programName}`),
        label: '',
        style: GraphLikeStyle.Rounded,
        color: 'none',
      },
      nodeList: endingVoictentNodeList,
      edgeList: [],
      subgraphList: [],
    };

    // Creates an invisible arrow between inputs for the same estinant to force them to be in order
    const inputOrderingEdgeList = engineProgram.estinantList
      .flatMap((estinant) => {
        return estinant.inputList.map((input, index, list) => {
          if (index < list.length - 1) {
            const edge: DirectedGraphEdge = {
              attributeByKey: {
                id: `${input.id}:${list[index + 1].id}`,
                style: EdgeStyle.Invisible,
              },
              tailId: input.id,
              headId: list[index + 1].id,
            };

            return edge;
          }

          return null;
        });
      })
      .filter(isNotNull);

    const rootGraph: DirectedGraph = {
      zorn: associationId,
      isRoot: true,
      attributeByKey: {
        id: engineProgram.id,
        label: engineProgram.programName,
        labelloc: GraphLikeLabelLocation.Top,
        fontsize: FONT_SIZE.root,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      nodeList: [startNode, ...middleVoictentNodeList, endNode],
      edgeList: [
        ...startingEdgeList,
        ...inputEdgeList,
        ...outputEdgeList,
        ...inputOrderingEdgeList,
        ...voictentToEndEdgeList,
        ...estinantToEndEdgeList,
      ],
      subgraphList: [
        startSubgraph,
        ...estinantSubgraphMetadataList.map(({ estinantSubgraph }) => {
          return estinantSubgraph;
        }),
        endSubgraph,
      ],
    };

    const metadataById: DirectedGraphMetadataById = {
      zorn: associationId,
      grition: {},
    };

    metadataById.grition[engineProgram.id] = {
      title: engineProgram.programName,
      fieldList: [
        {
          label: 'Type',
          value: 'Program',
        },
        {
          label: 'Description',
          value: engineProgram.description,
        },
        {
          label: 'File Path',
          value: engineProgram.filePath,
        },
      ],
    };

    voictentList.forEach((voictent) => {
      const fieldList: DirectedGraphMetadatumField[] = [
        {
          label: 'Type',
          value: 'Collection',
        },
      ];

      if (voictent.commentText !== '') {
        fieldList.push({
          label: 'Collection Item Description',
          value: voictent.commentText,
        });
      }

      metadataById.grition[voictent.id] = {
        title: voictent.name,
        fieldList,
      };
    });

    engineProgram.estinantList.forEach((estinant) => {
      metadataById.grition[estinant.id] = {
        title: estinant.estinantName,
        fieldList: [
          {
            label: 'Type',
            value: 'Transform',
          },
          {
            label: 'Description',
            value: estinant.commentText,
          },
          ...estinant.inputList.map((input) => {
            return {
              label:
                input.index === 0 ? 'Left Input' : `Right Input ${input.index}`,
              value: input.voictentName,
            };
          }),
          {
            label: 'Output',
            value: estinant.outputList
              .map((output) => output.voictentName)
              .join(', '),
          },
        ],
      };
    });

    estinantInputMetadataList.forEach(({ estinant, input }) => {
      const inputName =
        input.index === 0 ? 'Left Input' : `Right Input ${input.index}`;

      metadataById.grition[input.id] = {
        title: `${estinant.estinantName}: ${inputName}`,
        fieldList: [
          {
            label: 'Type',
            value: 'Transform Input',
          },
          {
            label: 'Source Collection',
            value: input.voictentName,
          },
        ],
      };
    });

    metadataById.grition[startNode.attributeByKey.id] = {
      title: 'Start',
      fieldList: [
        {
          label: 'Description',
          value:
            'This represents the starting point for all paths through an engine program. It points to the collections for which the programmer has provided intitial values.',
        },
        {
          label: 'Starting Collections',
          value: startingVoictentList
            .map((voictent) => voictent.name)
            .join(', '),
        },
      ],
    };

    const terminatingEstinantList = engineProgram.estinantList.filter(
      (estinant) => estinant.outputList.length === 0,
    );

    metadataById.grition[endNode.attributeByKey.id] = {
      title: 'End',
      fieldList: [
        {
          label: 'Description',
          value:
            'This represents a terminal point for all paths through an engine program. The program as a whole does not terminate until zero transforms are able to process information from their input collections on a tick of the engine.',
        },
        {
          label: 'Unused Collections',
          value: endingVoictentList.map((voictent) => voictent.name).join(', '),
        },
        {
          label: 'Terminating Transforms',
          value: terminatingEstinantList
            .map((estinant) => estinant.estinantName)
            .join(', '),
        },
      ],
    };

    mutateGraphLikeElementListOrder(rootGraph);
    mutateDirectedGraphMetadataById(metadataById);

    return {
      [DIRECTED_GRAPH_GEPP]: rootGraph,
      [DIRECTED_GRAPH_METADATA_BY_ID_GEPP]: metadataById,
    };
  })
  .assemble();
