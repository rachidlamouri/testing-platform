import { getTextDigest } from '../../../package-agnostic-utilities/string/getTextDigest';
import { getZorn } from '../../../layer-agnostic-utilities/deprecated-zorn/getZorn';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import { buildEstinant } from '../../../adapter/estinant-builder/buildEstinant';
import { OdeshinZorn } from '../../../adapter/odeshin/identifiableItem';
import {
  ENGINE_ESTINANT_3_GEPP,
  EngineEstinant3Voque,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  ProgramEstinantRelationshipVoque,
  PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
} from '../../programmable-units/engine-program/programEstinantRelationship';
import { EdgeStyle } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge';
import { DirectedGraphEdge2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_GEPP,
  DirectedGraphElement2Voque,
} from '../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { NodeShape } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphNode2';
import { RankType } from '../../programmable-units/graph-visualization/directed-graph/directedSubgraph';
import { DirectedSubgraph2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedSubgraph2';
import { GraphConstituentLocatorInstance } from '../../programmable-units/graph-visualization/directed-graph/graphConstituentLocator';
import { LocalDirectedGraphElement2Zorn } from '../../programmable-units/graph-visualization/directed-graph/types';
import { COMMON_ATTRIBUTE_BY_KEY } from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

/**
 * Creates a subgraph to group the estinant node and its input nodes, as well as
 * a set of invisible edges to force the input nodes to render in order
 *
 * @readableName getProgrammedTransformModelGraphElement
 */
export const getEngineEstinantGraphElements = buildEstinant({
  name: 'getEngineEstinantGraphElements',
})
  .fromHubblepup2<ProgramEstinantRelationshipVoque>({
    gepp: PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
  })
  .andFromHubblepupTuple2<EngineEstinant3Voque, [OdeshinZorn]>({
    gepp: ENGINE_ESTINANT_3_GEPP,
    framate: (relationship) => {
      return [relationship.item.estinantLocator.zorn];
    },
    croard: (engineEstinant) => engineEstinant.item.locator.zorn,
  })
  .toHubblepupTuple2<DirectedGraphElement2Voque>({
    gepp: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onPinbe((relationship, [engineEstinant]) => {
    const { rootGraphLocator } = relationship;

    const rootEstinantSubgraphDistinguisher = `${relationship.programName} | ${engineEstinant.estinantName} | estinant-subgraph`;
    const rootEstinantSubgraphId = getTextDigest(
      rootEstinantSubgraphDistinguisher,
    );

    const rootEstinantSubgraphLocalZorn =
      LocalDirectedGraphElement2Zorn.buildSubgraphZorn({
        distinguisher: rootEstinantSubgraphDistinguisher,
      });

    const rootEstinantSubgraphLocator = new GraphConstituentLocatorInstance({
      localZorn: rootEstinantSubgraphLocalZorn,
      rootGraphLocator,
      parentId: rootGraphLocator.id,
    });

    const estinantInputSubgraphDistinguisher = `${relationship.programName} | ${engineEstinant.estinantName} | estinant-input-subgraph`;
    const estinantInputSubgraphLocator = new GraphConstituentLocatorInstance({
      localZorn: LocalDirectedGraphElement2Zorn.buildSubgraphZorn({
        distinguisher: estinantInputSubgraphDistinguisher,
      }),
      rootGraphLocator,
      parentId: rootEstinantSubgraphId,
    });

    const rootEstinantSubgraph = new DirectedSubgraph2Instance({
      locator: rootEstinantSubgraphLocator,
      inputAttributeByKey: {},
    });

    const estinantInputSubgraph = new DirectedSubgraph2Instance({
      locator: estinantInputSubgraphLocator,
      inputAttributeByKey: {
        rank: RankType.Same,
      },
    });

    const estinantNode = new DirectedGraphNode2Instance({
      locator: new GraphConstituentLocatorInstance({
        rootGraphLocator,
        parentId: rootEstinantSubgraph.id,
        localZorn: LocalDirectedGraphElement2Zorn.buildNodeZorn({
          distinguisher: engineEstinant.identifierName,
        }),
      }),
      inputAttributeByKey: {
        label: engineEstinant.identifierName,
        shape: NodeShape.InvertedHouse,
        ...COMMON_ATTRIBUTE_BY_KEY,
      },
    });

    const inputNodeList = engineEstinant.inputList.map((input) => {
      const label = input.index === 0 ? 'L' : `R${input.index}`;
      const inputNode = new DirectedGraphNode2Instance({
        locator: new GraphConstituentLocatorInstance({
          rootGraphLocator,
          parentId: estinantInputSubgraph.id,
          localZorn: LocalDirectedGraphElement2Zorn.buildNodeZorn({
            distinguisher: getZorn([engineEstinant.estinantName, label]),
          }),
        }),
        inputAttributeByKey: {
          label,
          shape: NodeShape.InvertedTriangle,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
      });

      return inputNode;
    });

    const inputOrderingEdgeList = engineEstinant.inputList
      .map((input, index, list) => {
        if (index === list.length - 1) {
          return null;
        }

        const nextInput = list[index + 1];

        const edge = new DirectedGraphEdge2Instance({
          tailId: input.id,
          headId: nextInput.id,
          attributeByKey: {
            style: EdgeStyle.Invisible,
          },
          rootGraphLocator,
        });

        return edge;
      })
      .filter(isNotNull);

    return [
      rootEstinantSubgraph,
      estinantInputSubgraph,
      estinantNode,
      ...inputNodeList,
      ...inputOrderingEdgeList,
    ];
  })
  .assemble();
