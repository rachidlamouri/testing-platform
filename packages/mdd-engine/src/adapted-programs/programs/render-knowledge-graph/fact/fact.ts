import {
  InMemoryIdentifiableItem2IndexByName,
  BaseInMemoryIdentifiableItem2Collection,
} from '../../../../layer-agnostic-utilities/collection/inMemoryIdentifiableItemCollection2';

import { InMemoryStreamMetatype } from '../../../../layer-agnostic-utilities/stream-metatype/inMemoryStreamMetatype';
import { DirectedGraphElement2 } from '../../../programmable-units/graph-visualization/directed-graph/directedGraphElement2';
import { FileDependencyPathSegmentFact } from '../dependency/dependency-path/fileDependencyPathSegmentFact';
import { PartitionFact } from '../partition-fact/partitionFact';
import { FileDependencyPathNodeFact } from '../dependency/dependency-path/fileDependencyPathNodeFact';
import { DirectoryFact2 } from '../directory/directoryFact2';
import { FileFact2 } from '../file/fileFact2';

/**
 * A piece of knowledge. This file is for facts that have graphElements.
 */
export type Fact =
  | PartitionFact
  | DirectoryFact2
  | FileFact2
  | FileDependencyPathNodeFact
  | FileDependencyPathSegmentFact;

type FactCollectionStreamable = {
  graphElementList: DirectedGraphElement2[];
  byLocalGraphElementId: Map<string, Fact>;
};

export const FACT_COLLECTION_ID = 'fact';

type FactCollectionId = typeof FACT_COLLECTION_ID;

export type FactStreamMetatype = InMemoryStreamMetatype<
  FactCollectionId,
  Fact,
  Fact,
  InMemoryIdentifiableItem2IndexByName,
  FactCollectionStreamable
>;

export class FactCollection extends BaseInMemoryIdentifiableItem2Collection<
  FactStreamMetatype,
  FactStreamMetatype
> {
  private graphElementList: DirectedGraphElement2[] = [];

  private byLocalGraphElementId = new Map<string, Fact>();

  constructor() {
    super({
      collectionId: FACT_COLLECTION_ID,
      initialItemEggTuple: [],
      continueOnDuplicate: false,
    });
  }

  addItem(item: Fact): void {
    this.graphElementList.push(item.graphElement);

    // TODO: the below note indicates that some concerns need to be separated. As in this collection shouldn't be at the "fact" level or that "fact" is no longer what we wanted it to be
    // Note: there will be multiple facts for the same element (one for each partition where the element should appear). That's ok for the purposes of this collection
    this.byLocalGraphElementId.set(item.graphElement.oldId, item);

    super.addItem(item);
  }

  protected dereferenceCollection(): FactCollectionStreamable {
    return {
      graphElementList: this.graphElementList,
      byLocalGraphElementId: this.byLocalGraphElementId,
    };
  }
}
