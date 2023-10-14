import { assertNotNull } from '../../../../package-agnostic-utilities/nil/assertNotNull';
import { isNotNull } from '../../../../package-agnostic-utilities/nil/isNotNull';
import { buildProgrammedTransform } from '../../../../adapter/programmed-transform-builder/buildProgrammedTransform';
import {
  BOUNDARY_COLLECTION_ID,
  BoundaryStreamMetatype,
} from '../boundary/boundary';
import {
  PARTITIONED_BOUNDARY_COLLECTION_ID,
  PartitionedBoundaryInstance,
  PartitionedBoundaryStreamMetatype,
} from '../boundary/partitionedBoundary';
import {
  COMMON_BOUNDARY_ROOT_COLLECTION_ID,
  CommonBoundaryRootStreamMetatype,
} from '../common-boundary-root/commonBoundaryRoot';
import {
  LAYER_TRIE_COLLECTION_ID,
  LayerTrieStreamMetatype,
} from '../layer/layerTrie';
import {
  PARTITION_FACT_COLLECTION_ID,
  PartitionFactInstance,
  PartitionFactStreamMetatype,
} from './partitionFact';

/**
 * Creates a partition fact and a partitioned boundary from a boundary.
 */
export const getBoundaryPartition = buildProgrammedTransform({
  name: 'getBoundaryPartition',
})
  .fromItem2<BoundaryStreamMetatype>({
    collectionId: BOUNDARY_COLLECTION_ID,
  })
  .andFromItemTuple2<LayerTrieStreamMetatype, ['']>({
    collectionId: LAYER_TRIE_COLLECTION_ID,
    // TODO: make a more readable pattern for singleton collections
    getRightKeyTuple: () => [''],
    getRightKey: () => '',
  })
  .andFromItemTuple2<CommonBoundaryRootStreamMetatype, ['']>({
    collectionId: COMMON_BOUNDARY_ROOT_COLLECTION_ID,
    // TODO: make a more readable pattern for singleton collections
    getRightKeyTuple: () => [''],
    getRightKey: () => '',
  })
  .toItem2<PartitionFactStreamMetatype>({
    collectionId: PARTITION_FACT_COLLECTION_ID,
  })
  .toItem2<PartitionedBoundaryStreamMetatype>({
    collectionId: PARTITIONED_BOUNDARY_COLLECTION_ID,
  })
  .onTransform((boundary, [layerTrie], [commonBoundaryRoot]) => {
    const layer = layerTrie.find(
      boundary.directory.directoryPath.partList,
      isNotNull,
    );

    assertNotNull(
      layer,
      `Unable to find layer for boundary: ${boundary.displayName}`,
    );

    const partitionFact = new PartitionFactInstance({
      layer,
      boundary,
      commonBoundaryRoot,
    });

    return {
      [PARTITION_FACT_COLLECTION_ID]: partitionFact,
      [PARTITIONED_BOUNDARY_COLLECTION_ID]: new PartitionedBoundaryInstance({
        partitionFact,
        boundary,
      }),
    };
  })
  .assemble();
