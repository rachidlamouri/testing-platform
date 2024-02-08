import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { GraphLikeLabelLocation } from '../../graph-visualization/directed-graph/attributeByKeyGSC';
import { DirectedEdge } from '../../graph-visualization/directed-graph/element/directedEdge';
import { DirectedGraph } from '../../graph-visualization/directed-graph/element/directedGraph';
import { DirectedGraphElement } from '../../graph-visualization/directed-graph/element/directedGraphElement';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/element/directedGraphNode';
import { CollectionInstanceModel } from '../collection-instance/collectionInstanceModel';
import { ProgrammedTransformInstance } from '../programmed-transform/programmedTransformInstance';
import { ProgramId } from './programId';
import { ProgramSkeleton } from './programSkeleton';

type ProgramModelInput = {
  skeleton: ProgramSkeleton;
  collectionInstanceList: CollectionInstanceModel[];
  transformInstanceList: ProgrammedTransformInstance[];
  unconsumedCollectionInstanceList: CollectionInstanceModel[];
  unfedCollectionInstanceList: CollectionInstanceModel[];
};

/**
 * The information needed to present a model of a program
 */
export class ProgramModel implements ProgramModelInput {
  get id(): ProgramId {
    return this.skeleton.id;
  }

  skeleton: ProgramSkeleton;

  transformInstanceList: ProgrammedTransformInstance[];

  collectionInstanceList: CollectionInstanceModel[];

  unconsumedCollectionInstanceList: CollectionInstanceModel[];

  unfedCollectionInstanceList: CollectionInstanceModel[];

  graphElementList: DirectedGraphElement[];

  constructor(input: ProgramModelInput) {
    const { graphLocator, programLocator } = input.skeleton;
    const { programName } = programLocator;

    this.skeleton = input.skeleton;
    this.collectionInstanceList = input.collectionInstanceList;
    this.transformInstanceList = input.transformInstanceList;
    this.unconsumedCollectionInstanceList =
      input.unconsumedCollectionInstanceList;
    this.unfedCollectionInstanceList = input.unfedCollectionInstanceList;

    const programSource = programLocator.programFile.source;

    const graph = new DirectedGraph({
      locator: graphLocator,
      inputAttributeByKey: {
        labelloc: GraphLikeLabelLocation.Top,
      },
      outputFileName: programName,
    });

    const startNode = new DirectedGraphNode({
      graphLocator,
      parentLocator: graphLocator,
      source: programSource,
      distinguisher: 'start',
      inputAttributeByKey: {
        label: 'start',
        color: 'green',
      },
    });

    const startingEdgeList = input.unfedCollectionInstanceList.map(
      (instance) => {
        return new DirectedEdge({
          graphLocator,
          tail: startNode,
          head: instance.node,
          source: programSource,
        });
      },
    );

    const endNode = new DirectedGraphNode({
      graphLocator,
      parentLocator: graphLocator,
      source: programSource,
      distinguisher: 'end',
      inputAttributeByKey: {
        label: 'end',
        color: 'blue',
      },
    });

    const endingCollectionEdgeList = input.unconsumedCollectionInstanceList.map(
      (instance) => {
        return new DirectedEdge({
          graphLocator,
          tail: instance.node,
          head: endNode,
          source: programSource,
        });
      },
    );

    const endingTransformEdgeList = input.transformInstanceList
      .filter((instance) => instance.model.outputModelList.length === 0)
      .map((instance) => {
        return new DirectedEdge({
          graphLocator,
          tail: instance.outputNode,
          head: endNode,
          source: programSource,
        });
      });

    this.graphElementList = [
      // keep multiline
      graph,
      startNode,
      ...startingEdgeList,
      endNode,
      ...endingCollectionEdgeList,
      ...endingTransformEdgeList,
    ];
  }

  allGraphElementList(): DirectedGraphElement[] {
    return [
      ...this.graphElementList,
      ...this.collectionInstanceList.map((instance) => {
        return instance.node;
      }),
      ...this.transformInstanceList.flatMap((instance) => {
        return instance.graphElementList;
      }),
    ];
  }
}

export const PROGRAM_MODEL_COLLECTION_ID = 'program-model';

type ProgramModelCollectionId = typeof PROGRAM_MODEL_COLLECTION_ID;

export type ProgramModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    ProgramModelCollectionId,
    ProgramModel
  >;
