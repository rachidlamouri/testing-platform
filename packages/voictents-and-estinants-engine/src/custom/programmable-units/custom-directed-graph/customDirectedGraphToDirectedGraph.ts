import { buildOnama } from '../../adapter/estinant/onama';
import {
  LabelLocation,
  Shape,
} from '../graph-visualization/directed-graph/attribute';
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
  CustomDirectedGraph,
  CustomDirectedGraphEdge,
  CustomDirectedGraphElement,
  CustomDirectedGraphElementTypeName,
  CustomDirectedGraphNode,
  CustomDirectedGraphVoictent,
  CUSTOM_DIRECTED_GRAPH_GEPP,
} from './customDirectedGraph';

// TODO: figure out where this should go
const fontname = 'sans-serif';

type G<TCustomDirectedGraphElement extends CustomDirectedGraphElement> =
  TCustomDirectedGraphElement extends CustomDirectedGraph
    ? DirectedSubgraph
    : TCustomDirectedGraphElement extends CustomDirectedGraphNode
    ? DirectedGraphNode
    : TCustomDirectedGraphElement extends CustomDirectedGraphEdge
    ? DirectedGraphEdge
    : never;

const mapElement = <
  TCustomDirectedGraphElement extends CustomDirectedGraphElement,
>(
  element: TCustomDirectedGraphElement,
): G<TCustomDirectedGraphElement> => {
  switch (element.typeName) {
    case CustomDirectedGraphElementTypeName.Graph:
      return {
        isRoot: false,
        attributeByKey: {
          id: `cluster_${element.id}`,
          label: element.label,
          fontname,
          fontsize: 60,
        },
        nodeList: element.nodeList.map((node) =>
          mapElement<CustomDirectedGraphNode>(node),
        ),
        edgeList: element.edgeList.map((edge) =>
          mapElement<CustomDirectedGraphEdge>(edge),
        ),
        subgraphList: element.subgraphList.map((subgraph) =>
          mapElement<CustomDirectedGraph>(subgraph),
        ),
      } satisfies DirectedSubgraph as G<TCustomDirectedGraphElement>;
    case CustomDirectedGraphElementTypeName.Node:
      return {
        attributeByKey: {
          id: element.id,
          label: element.label,
          shape: Shape.Box,
          fontname,
          fontsize: 40,
        },
      } satisfies DirectedGraphNode as G<TCustomDirectedGraphElement>;
    case CustomDirectedGraphElementTypeName.Edge:
      return {
        attributeByKey: {
          id: element.id,
        },
        tailId: element.tailId,
        headId: element.headId,
      } satisfies DirectedGraphEdge as G<TCustomDirectedGraphElement>;
  }
};

export const customDirectedGraphToDirectedGraph = buildOnama<
  CustomDirectedGraphVoictent,
  DirectedGraphVoictent
>({
  inputGepp: CUSTOM_DIRECTED_GRAPH_GEPP,
  outputGepp: DIRECTED_GRAPH_GEPP,
  pinbe: (input) => {
    const rootGraphAsSubgraph = mapElement(input);

    const rootGraph: DirectedGraph = {
      isRoot: true,
      attributeByKey: {
        label: input.label,
        labelloc: LabelLocation.Top,
        rankdir: DirectedGraphRankDirection.LeftRight,
        fontname,
        fontsize: 80,
      },
      nodeList: rootGraphAsSubgraph.nodeList,
      edgeList: rootGraphAsSubgraph.edgeList,
      subgraphList: rootGraphAsSubgraph.subgraphList,
    };

    return rootGraph;
  },
});
