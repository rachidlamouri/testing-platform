import {
  ComplexId,
  GenericComplexIdTemplate,
} from '../../../../package-agnostic-utilities/data-structure/id';
import { assertNotUndefined } from '../../../../package-agnostic-utilities/nil/assertNotUndefined';
import { isNotNullish } from '../../../../package-agnostic-utilities/nil/isNotNullish';
import { DirectedEdge } from '../../graph-visualization/directed-graph/element/directedEdge';
import { DirectedGraphElement } from '../../graph-visualization/directed-graph/element/directedGraphElement';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/element/directedGraphNode';
import { DirectedSubgraph } from '../../graph-visualization/directed-graph/element/directedSubgraph';
import { EdgeStyle } from '../../graph-visualization/directed-graph/graphviz-adapter/element-attribute-by-key/partialEdgeAttributeByKey';
import { NodeShape } from '../../graph-visualization/directed-graph/graphviz-adapter/element-attribute-by-key/partialNodeAttributeByKey';
import { RankType } from '../../graph-visualization/directed-graph/graphviz-adapter/element-attribute-by-key/partialSubgraphAttributeByKey';
import { DirectedSubgraphLocator } from '../../graph-visualization/directed-graph/locator/directedSubgraphLocator';
import { CollectionInstanceModel } from '../collection-instance/collectionInstanceModel';
import { ProgramId } from '../program/programId';
import { ProgramSkeleton } from '../program/programSkeleton';
import { ProgrammedTransformId } from './programmedTransformId';
import { ProgrammedTransformModel } from './programmedTransformModel';

const PROGRAMMED_TRANSFORM_INSTANCE_ID_TEMPLATE = [
  ['program', ProgramId],
  ['transform', ProgrammedTransformId],
] as const satisfies GenericComplexIdTemplate;
type ProgrammedTransformInstanceIdTemplate =
  typeof PROGRAMMED_TRANSFORM_INSTANCE_ID_TEMPLATE;
class ProgrammedTransformInstanceId extends ComplexId<ProgrammedTransformInstanceIdTemplate> {
  get rawTemplate(): ProgrammedTransformInstanceIdTemplate {
    return PROGRAMMED_TRANSFORM_INSTANCE_ID_TEMPLATE;
  }
}

type ProgrammedTransformInstanceInput = {
  programSkeleton: ProgramSkeleton;
  model: ProgrammedTransformModel;
  collectionInstanceList: CollectionInstanceModel[];
};

/**
 * A programmed transform within the context of a specific program
 */
export class ProgrammedTransformInstance
  implements ProgrammedTransformInstanceInput
{
  id: ProgrammedTransformInstanceId;

  programSkeleton: ProgramSkeleton;

  model: ProgrammedTransformModel;

  graphElementList: DirectedGraphElement[];

  collectionInstanceList: CollectionInstanceModel[];

  outputNode: DirectedGraphNode;

  constructor(input: ProgrammedTransformInstanceInput) {
    this.id = new ProgrammedTransformInstanceId({
      program: input.programSkeleton,
      transform: input.model,
    });
    this.programSkeleton = input.programSkeleton;
    this.model = input.model;
    this.collectionInstanceList = input.collectionInstanceList;

    const collectionInstanceByItemId = new Map(
      input.collectionInstanceList.map((instance) => {
        return [instance.itemDefinition.id.forHuman, instance];
      }),
    );

    const { graphLocator } = input.programSkeleton;
    const { model } = input;

    const transformSource = model.skeleton.locator.locateeSource;
    const transformName = model.name;

    const rootSubgraphLocator = new DirectedSubgraphLocator({
      graphLocator,
      parentLocator: graphLocator,
      source: transformSource,
      distinguisher: 'root-subgraph',
    });

    const rootSubgraph = new DirectedSubgraph({
      locator: rootSubgraphLocator,
      inputAttributeByKey: {},
    });

    const primaryTransformNode = new DirectedGraphNode({
      graphLocator,
      parentLocator: rootSubgraphLocator,
      source: transformSource,
      distinguisher: 'primary-node',
      inputAttributeByKey: {
        label: transformName,
        shape: NodeShape.InvertedHouse,
      },
    });

    const inputSubgraphLocator = new DirectedSubgraphLocator({
      graphLocator,
      parentLocator: rootSubgraphLocator,
      source: transformSource,
      distinguisher: 'input-subgraph',
    });

    const inputModelAndNodeList = model.inputModelList.map((inputModel) => {
      return {
        inputModel,
        inputNode: new DirectedGraphNode({
          graphLocator,
          parentLocator: inputSubgraphLocator,
          source: transformSource,
          distinguisher: `input-subgraph/${inputModel.index}`,
          inputAttributeByKey: {
            shape: NodeShape.Point,
          },
        }),
      };
    });

    const inputNodeList = inputModelAndNodeList.map(
      ({ inputNode }) => inputNode,
    );

    const inputSubgraph = new DirectedSubgraph({
      locator: inputSubgraphLocator,
      inputAttributeByKey: {
        rank: RankType.Same,
      },
    });

    const collectionToInputEdgeList = inputModelAndNodeList.map(
      ({ inputModel, inputNode }) => {
        const collectionInstance = collectionInstanceByItemId.get(
          inputModel.itemDefinition.id.forHuman,
        );
        assertNotUndefined(collectionInstance);

        return new DirectedEdge({
          graphLocator,
          tail: collectionInstance.node,
          head: inputNode,
          source: transformSource,
        });
      },
    );

    const orderingEdgeList = inputNodeList
      .map((node, index) => {
        const nextNode = inputNodeList[index + 1];
        if (nextNode === undefined) {
          return null;
        }

        return new DirectedEdge({
          graphLocator,
          tail: node,
          head: nextNode,
          source: transformSource,
          attributeByKey: {
            style: EdgeStyle.Invisible,
          },
        });
      })
      .filter(isNotNullish);

    const inputToTransformEdgeList = inputNodeList.map((node) => {
      return new DirectedEdge({
        graphLocator,
        tail: node,
        head: primaryTransformNode,
        source: transformSource,
      });
    });

    const outputNode = new DirectedGraphNode({
      graphLocator,
      parentLocator: rootSubgraphLocator,
      source: transformSource,
      distinguisher: `output-node`,
      inputAttributeByKey: {
        shape: NodeShape.Point,
      },
    });
    this.outputNode = outputNode;

    const transformToOutputNodeEdge = new DirectedEdge({
      graphLocator,
      tail: primaryTransformNode,
      head: outputNode,
      source: transformSource,
    });

    const outputNodeToCollectionEdgeList = model.outputModelList.map(
      (outputModel) => {
        const collectionInstance = collectionInstanceByItemId.get(
          outputModel.itemDefinition.id.forHuman,
        );
        assertNotUndefined(collectionInstance);

        return new DirectedEdge({
          graphLocator,
          tail: outputNode,
          head: collectionInstance.node,
          source: transformSource,
        });
      },
    );

    this.graphElementList = [
      rootSubgraph,
      primaryTransformNode,
      inputSubgraph,
      ...inputNodeList,
      ...collectionToInputEdgeList,
      ...orderingEdgeList,
      ...inputToTransformEdgeList,
      outputNode,
      transformToOutputNodeEdge,
      ...outputNodeToCollectionEdgeList,
    ];
  }
}
