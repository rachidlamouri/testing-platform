import { getTextDigest } from '../../../package-agnostic-utilities/string/getTextDigest';
import { getId } from '../../../layer-agnostic-utilities/deprecated-id/getId';
import { isNotNull } from '../../../package-agnostic-utilities/nil/isNotNull';
import { buildProgrammedTransform } from '../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import { IdentifiableItemId } from '../../../adapter/identifiable-item/identifiableItem';
import {
  ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
  EngineProgrammedTransform3StreamMetatype,
} from '../../programmable-units/engine-program/engineEstinant3';
import {
  ProgramProgrammedTransformRelationshipStreamMetatype,
  PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
} from '../../programmable-units/engine-program/programEstinantRelationship';
import { EdgeStyle } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge';
import { DirectedGraphEdge2Instance } from '../../programmable-units/graph-visualization/directed-graph/directedGraphEdge2';
import {
  DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
  DirectedGraphElement2StreamMetatype,
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
export const getEngineProgrammedTransformGraphElements =
  buildProgrammedTransform({
    name: 'getEngineEstinantGraphElements',
  })
    .fromItem2<ProgramProgrammedTransformRelationshipStreamMetatype>({
      collectionId: PROGRAM_PROGRAMMED_TRANSFORM_RELATIONSHIP_COLLECTION_ID,
    })
    .andFromItemTuple2<
      EngineProgrammedTransform3StreamMetatype,
      [IdentifiableItemId]
    >({
      collectionId: ENGINE_PROGRAMMED_TRANSFORM_3_COLLECTION_ID,
      getRightKeyTuple: (relationship) => {
        return [relationship.item.programmedTransformLocator.id];
      },
      getRightKey: (engineProgrammedTransform) =>
        engineProgrammedTransform.item.locator.id,
    })
    .toItemTuple2<DirectedGraphElement2StreamMetatype>({
      collectionId: DIRECTED_GRAPH_ELEMENT_2_COLLECTION_ID,
    })
    .onTransform((relationship, [engineProgrammedTransform]) => {
      const { rootGraphLocator } = relationship;

      const rootProgrammedTransformSubgraphDistinguisher = `${relationship.programName} | ${engineProgrammedTransform.programmedTransformName} | estinant-subgraph`;
      const rootProgrammedTransformSubgraphId = getTextDigest(
        rootProgrammedTransformSubgraphDistinguisher,
      );

      const rootProgrammedTransformSubgraphLocalId =
        LocalDirectedGraphElement2Id.buildSubgraphId({
          distinguisher: rootProgrammedTransformSubgraphDistinguisher,
        });

      const rootProgrammedTransformSubgraphLocator =
        new GraphConstituentLocatorInstance({
          localId: rootProgrammedTransformSubgraphLocalId,
          rootGraphLocator,
          parentId: rootGraphLocator.oldId,
        });

      const programmedTransformInputSubgraphDistinguisher = `${relationship.programName} | ${engineProgrammedTransform.programmedTransformName} | estinant-input-subgraph`;
      const programmedTransformInputSubgraphLocator =
        new GraphConstituentLocatorInstance({
          localId: LocalDirectedGraphElement2Id.buildSubgraphId({
            distinguisher: programmedTransformInputSubgraphDistinguisher,
          }),
          rootGraphLocator,
          parentId: rootProgrammedTransformSubgraphId,
        });

      const rootProgrammedTransformSubgraph = new DirectedSubgraph2Instance({
        locator: rootProgrammedTransformSubgraphLocator,
        inputAttributeByKey: {},
      });

      const programmedTransformInputSubgraph = new DirectedSubgraph2Instance({
        locator: programmedTransformInputSubgraphLocator,
        inputAttributeByKey: {
          rank: RankType.Same,
        },
      });

      const programmedTransformNode = new DirectedGraphNode2Instance({
        locator: new GraphConstituentLocatorInstance({
          rootGraphLocator,
          parentId: rootProgrammedTransformSubgraph.oldId,
          localId: LocalDirectedGraphElement2Id.buildNodeId({
            distinguisher: engineProgrammedTransform.identifierName,
          }),
        }),
        inputAttributeByKey: {
          label: engineProgrammedTransform.identifierName,
          shape: NodeShape.InvertedHouse,
          ...COMMON_ATTRIBUTE_BY_KEY,
        },
      });

      const inputNodeList = engineProgrammedTransform.inputList.map((input) => {
        const label = input.index === 0 ? 'L' : `R${input.index}`;
        const inputNode = new DirectedGraphNode2Instance({
          locator: new GraphConstituentLocatorInstance({
            rootGraphLocator,
            parentId: programmedTransformInputSubgraph.oldId,
            localId: LocalDirectedGraphElement2Id.buildNodeId({
              distinguisher: getId([
                engineProgrammedTransform.programmedTransformName,
                label,
              ]),
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

      const inputOrderingEdgeList = engineProgrammedTransform.inputList
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
        rootProgrammedTransformSubgraph,
        programmedTransformInputSubgraph,
        programmedTransformNode,
        ...inputNodeList,
        ...inputOrderingEdgeList,
      ];
    })
    .assemble();
