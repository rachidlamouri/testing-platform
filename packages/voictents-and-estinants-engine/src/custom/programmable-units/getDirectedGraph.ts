import * as uuid from 'uuid';
import { buildEstinant } from '../adapter/estinant-builder/estinantBuilder';
import {
  ENGINE_PROGRAM_GEPP,
  EngineProgramVoictent,
} from './engine-program/engineProgram';
import {
  DIRECTED_GRAPH_GEPP,
  DirectedGraph,
  DirectedGraphVoictent,
} from './graph-visualization/directed-graph/directedGraph';
import {
  DIRECTED_GRAPH_METADATA_BY_ID_GEPP,
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

type EngineVoictent = {
  id: string;
  name: string;
};

export const getDirectedGraph = buildEstinant({
  name: 'getDirectedGraph',
})
  .fromGrition<EngineProgramVoictent>({
    gepp: ENGINE_PROGRAM_GEPP,
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
    const voictentNameSet = new Set<string>();
    engineProgram.estinantList.forEach((estinant) => {
      estinant.inputList.forEach((input) => {
        voictentNameSet.add(input.voictentName);
      });

      estinant.outputList.forEach((output) => {
        voictentNameSet.add(output.voictentName);
      });
    });

    const voictentList: EngineVoictent[] = [...voictentNameSet].map((name) => {
      return {
        id: uuid.v4(),
        name,
      };
    });

    const voictentNodeList = voictentList.map((voictent) => {
      const node: DirectedGraphNode = {
        attributeByKey: {
          id: voictent.id,
          label: voictent.name,
          shape: Shape.Box,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
      };

      return node;
    });

    const estinantNodeList = engineProgram.estinantList.map((estinant) => {
      const node: DirectedGraphNode = {
        attributeByKey: {
          id: estinant.id,
          label: estinant.estinantName,
          shape: Shape.InvertedHouse,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
      };

      return node;
    });

    const estinantInputNodeList = engineProgram.estinantList
      .flatMap((estinant) => {
        return estinant.inputList;
      })
      .map((input) => {
        const node: DirectedGraphNode = {
          attributeByKey: {
            id: input.id,
            label: input.index === 0 ? 'L' : 'R',
            shape: Shape.InvertedTriangle,
            ...COMMON_ATTRIBUTE_BY_KEY,
          },
        };

        return node;
      });

    const voictentByName = new Map<string, EngineVoictent>(
      voictentList.map((voictent) => {
        return [voictent.name, voictent];
      }),
    );

    const inputEdgeList = engineProgram.estinantList.flatMap((estinant) => {
      const reverseInputList = [...estinant.inputList].reverse();

      return reverseInputList.flatMap((input) => {
        const inputVoictent = voictentByName.get(
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
          const outputVoictent = voictentByName.get(
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

    const rootGraph: DirectedGraph = {
      isRoot: true,
      attributeByKey: {
        label: engineProgram.programName,
        labelloc: LabelLocation.Top,
        fontsize: FONT_SIZE.root,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
      nodeList: [
        ...voictentNodeList,
        ...estinantNodeList,
        ...estinantInputNodeList,
      ],
      edgeList: [...inputEdgeList, ...outputEdgeList],
      subgraphList: [],
    };

    return {
      [DIRECTED_GRAPH_GEPP]: rootGraph,
      [DIRECTED_GRAPH_METADATA_BY_ID_GEPP]: {},
    };
  })
  .assemble();
