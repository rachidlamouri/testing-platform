import { getTextDigest } from '../../../package-agnostic-utilities/string/getTextDigest';
import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
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
import { LocalDirectedGraphElement2Id } from '../../programmable-units/graph-visualization/directed-graph/types';
import { COMMON_ATTRIBUTE_BY_KEY } from '../../programmable-units/type-script-file-relationships/graph-element/commonAttributeByKey';

/**
 * Creates a subgraph to group the estinant node and its input nodes, as well as
 * a set of invisible edges to force the input nodes to render in order
 *
 * @readableName getProgrammedTransformModelGraphElement
 */
export const getEngineEstinantGraphElements = buildProgrammedTransform({
  name: 'getEngineEstinantGraphElements',
})
  .fromItem2<ProgramEstinantRelationshipVoque>({
    collectionId: PROGRAM_ESTINANT_RELATIONSHIP_GEPP,
  })
  .andFromItemTuple2<EngineEstinant3Voque, [IdentifiableItemId]>({
    collectionId: ENGINE_ESTINANT_3_GEPP,
    getRightKeyTuple: (relationship) => {
      return [relationship.item.estinantLocator.id];
    },
    getRightKey: (engineEstinant) => engineEstinant.item.locator.id,
  })
  .toItemTuple2<DirectedGraphElement2Voque>({
    collectionId: DIRECTED_GRAPH_ELEMENT_2_GEPP,
  })
  .onTransform((relationship, [engineEstinant]) => {
    const { rootGraphLocator } = relationship;

    const rootEstinantSubgraphDistinguisher = `${relationship.programName} | ${engineEstinant.estinantName} | estinant-subgraph`;
    const rootEstinantSubgraphId = getTextDigest(
      rootEstinantSubgraphDistinguisher,
    );

    const rootEstinantSubgraphLocalZorn =
      LocalDirectedGraphElement2Id.buildSubgraphZorn({
        distinguisher: rootEstinantSubgraphDistinguisher,
      });

    const rootEstinantSubgraphLocator = new GraphConstituentLocatorInstance({
      localId: rootEstinantSubgraphLocalZorn,
      rootGraphLocator,
      parentId: rootGraphLocator.oldId,
    });

    const estinantInputSubgraphDistinguisher = `${relationship.programName} | ${engineEstinant.estinantName} | estinant-input-subgraph`;
    const estinantInputSubgraphLocator = new GraphConstituentLocatorInstance({
      localId: LocalDirectedGraphElement2Id.buildSubgraphZorn({
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
        parentId: rootEstinantSubgraph.oldId,
        localId: LocalDirectedGraphElement2Id.buildNodeId({
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
          parentId: estinantInputSubgraph.oldId,
          localId: LocalDirectedGraphElement2Id.buildNodeId({
            distinguisher: getId([engineEstinant.estinantName, label]),
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
          tailId: input.oldId,
          headId: nextInput.oldId,
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
