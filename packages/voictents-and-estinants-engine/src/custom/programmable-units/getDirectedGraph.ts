import * as uuid from 'uuid';
import { buildEstinant } from '../adapter/estinant-builder/estinantBuilder';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
  DirectedGraphStyle,
  DirectedGraphVoictent,
  DirectedSubgraph,
} from './graph-visualization/directed-graph/directedGraph';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
  DirectedGraphMetadataById,
  DirectedGraphMetadataByIdVoictent,
} from './graph-visualization/directedGraphMetadataById';
import { DirectedGraphNode } from './graph-visualization/directed-graph/directedGraphNode';
import {
  LabelLocation,
  Shape,
} from './graph-visualization/directed-graph/attribute';
import {
  COMMON_ATTRIBUTE_BY_KEY,
  FONT_SIZE,
} from './type-script-file-relationships/graph-element/commonAttributeByKey';
import { DirectedGraphEdge } from './graph-visualization/directed-graph/directedGraphEdge';
import {
  ENGINE_PROGRAM_2_GEPP,
  EngineProgram2Voictent,
} from './engine-program/engineProgram2';

type EngineVoictent = {
  id: string;
  name: string;
  hasInitialInput: boolean;
  isConsumed: boolean;
};

/**
 * Converts an engine program into a directed graph and the associated metadata
 * to be displayed in the interactive directed graph.
 */
export const getDirectedGraph = buildEstinant({
  name: 'getDirectedGraph',
})
  .fromGrition<EngineProgram2Voictent>({
    gepp: ENGINE_PROGRAM_2_GEPP,
  })
  .toGrition<DirectedGraphVoictent>({
    gepp: DIRECTED_GRAPH_GEPP,
    getZorn: (leftInput) => leftInput.grition.programName,
  })
  .toGrition<DirectedGraphMetadataByIdVoictent>({
    gepp: DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
    getZorn: (leftInput) => leftInput.grition.programName,
  })
  .onPinbe((engineProgram) => {
    const engineVoictentByName = new Map<string, EngineVoictent>(
      engineProgram.initialVoictentNameList.map((voictentName) => {
        return [
          voictentName,
          {
            id: uuid.v4(),
            name: voictentName,
            hasInitialInput: true,
            isConsumed: false,
          },
        ];
      }),
    );

    engineProgram.estinantList.forEach((estinant) => {
      estinant.inputList.forEach((input) => {
        const cacheValue = engineVoictentByName.get(input.voictentName) ?? {
          id: uuid.v4(),
          name: input.voictentName,
          hasInitialInput: false,
          isConsumed: false,
        };

        cacheValue.isConsumed = true;

        engineVoictentByName.set(input.voictentName, cacheValue);
      });

      estinant.outputList.forEach((output) => {
        const cacheValue = engineVoictentByName.get(output.voictentName) ?? {
          id: uuid.v4(),
          name: output.voictentName,
          hasInitialInput: false,
          isConsumed: false,
        };

        engineVoictentByName.set(output.voictentName, cacheValue);
      });
    });

    const startNode: DirectedGraphNode = {
      attributeByKey: {
        id: uuid.v4(),
        label: 'START',
        shape: Shape.Circle,
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
          shape: Shape.Box,
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
        const subgraph: DirectedSubgraph = {
          isRoot: false,
          isCluster: true,
          attributeByKey: {
            id: uuid.v4(),
            label: '',
            style: DirectedGraphStyle.Rounded,
            color: 'gray',
          },
          nodeList: [],
          edgeList: [],
          subgraphList: [],
        };

        return {
          estinantId: estinant.id,
          subgraph,
        };
      },
    );

    const estinantSubgraphByEstinantId = new Map<string, DirectedSubgraph>(
      estinantSubgraphMetadataList.map(({ estinantId, subgraph }) => {
        return [estinantId, subgraph];
      }),
    );

    engineProgram.estinantList.forEach((estinant) => {
      const node: DirectedGraphNode = {
        attributeByKey: {
          id: estinant.id,
          label: estinant.estinantName,
          shape: Shape.InvertedHouse,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
      };

      const subgraph = estinantSubgraphByEstinantId.get(
        estinant.id,
      ) as DirectedSubgraph;

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
          shape: Shape.InvertedTriangle,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
      };

      const subgraph = estinantSubgraphByEstinantId.get(
        estinant.id,
      ) as DirectedSubgraph;

      subgraph.nodeList.push(node);
    });

    const endNode: DirectedGraphNode = {
      attributeByKey: {
        id: uuid.v4(),
        label: 'END',
        shape: Shape.Circle,
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
            attributeByKey: {
              id: `${tailId}:${headId}`,
            },
            tailId,
            headId,
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

    const startSubgraph: DirectedSubgraph = {
      isRoot: false,
      isCluster: true,
      attributeByKey: {
        id: uuid.v4(),
        label: '',
        style: DirectedGraphStyle.Rounded,
        color: 'none',
      },
      nodeList: startingVoictentNodeList,
      edgeList: [],
      subgraphList: [],
    };

    const endSubgraph: DirectedSubgraph = {
      isRoot: false,
      isCluster: true,
      attributeByKey: {
        id: uuid.v4(),
        label: '',
        style: DirectedGraphStyle.Rounded,
        color: 'none',
      },
      nodeList: endingVoictentNodeList,
      edgeList: [],
      subgraphList: [],
    };

    const rootGraph: DirectedGraph = {
      isRoot: true,
      attributeByKey: {
        id: engineProgram.id,
        label: engineProgram.programName,
        labelloc: LabelLocation.Top,
        fontsize: FONT_SIZE.root,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      nodeList: [startNode, ...middleVoictentNodeList, endNode],
      edgeList: [
        ...startingEdgeList,
        ...inputEdgeList,
        ...outputEdgeList,
        ...voictentToEndEdgeList,
        ...estinantToEndEdgeList,
      ],
      subgraphList: [
        startSubgraph,
        ...estinantSubgraphMetadataList.map(({ subgraph }) => {
          return subgraph;
        }),
        endSubgraph,
      ],
    };

    const metadataById: DirectedGraphMetadataById = {};

    metadataById[engineProgram.id] = {
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
      metadataById[voictent.id] = {
        title: voictent.name,
        fieldList: [
          {
            label: 'Type',
            value: 'Collection',
          },
        ],
      };
    });

    engineProgram.estinantList.forEach((estinant) => {
      metadataById[estinant.id] = {
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

      metadataById[input.id] = {
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

    metadataById[startNode.attributeByKey.id] = {
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

    metadataById[endNode.attributeByKey.id] = {
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

    return {
      [DIRECTED_GRAPH_GEPP]: rootGraph,
      [DIRECTED_GRAPH_METADATA_BY_ID_GEPP]: metadataById,
    };
  })
  .assemble();
