import { InMemoryIdentifiableItem3StreamMetatype } from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';
import { NodeShape } from '../../graph-visualization/directed-graph/directedGraphNode';
import { DirectedGraphNode } from '../../graph-visualization/directed-graph/element/directedGraphNode';
import { FileSourceInstance } from '../../linting/source/fileSource';
import { ItemDefinitionModel } from '../item-definition/itemDefinitionModel';
import { ProgramSkeleton } from '../program/programSkeleton';
import { CollectionInstanceId } from './collectionInstanceId';

type CollectionInstanceModelInput = {
  programSkeleton: ProgramSkeleton;
  // TODO: add this information back in
  // collectionDefinition: CollectionDefinitionModel;
  itemDefinition: ItemDefinitionModel;
};

/**
 * The model of a collection, its items, and the program it is instantiated in.
 */
export class CollectionInstanceModel implements CollectionInstanceModelInput {
  id: CollectionInstanceId;

  programSkeleton: ProgramSkeleton;

  // collectionDefinition: CollectionDefinitionModel;

  itemDefinition: ItemDefinitionModel;

  node: DirectedGraphNode;

  constructor(input: CollectionInstanceModelInput) {
    this.id = new CollectionInstanceId({
      program: input.programSkeleton,
      // collection: input.collectionDefinition,
      item: input.itemDefinition,
    });
    this.programSkeleton = input.programSkeleton;
    // this.collectionDefinition = input.collectionDefinition;
    this.itemDefinition = input.itemDefinition;

    const { graphLocator } = input.programSkeleton;

    this.node = new DirectedGraphNode({
      graphLocator,
      parentLocator: graphLocator,
      source: new FileSourceInstance({
        absoluteFilePath: __filename,
      }),
      distinguisher: this.itemDefinition.name,
      inputAttributeByKey: {
        label: this.itemDefinition.name,
        shape: NodeShape.Box,
      },
    });
  }
}

export const COLLECTION_INSTANCE_MODEL_COLLECTION_ID =
  'collection-instance-model';

type CollectionInstanceModelCollectionId =
  typeof COLLECTION_INSTANCE_MODEL_COLLECTION_ID;

export type CollectionInstanceModelStreamMetatype =
  InMemoryIdentifiableItem3StreamMetatype<
    CollectionInstanceModelCollectionId,
    CollectionInstanceModel
  >;
