import { assertNotNull } from '../../../../package-agnostic-utilities/nil/assertNotNull';
import { isNotNull } from '../../../../package-agnostic-utilities/nil/isNotNull';
import { buildEstinant } from '../../../../adapter/estinant-builder/buildEstinant';
import { BOUNDARY_GEPP, BoundaryVoque } from '../boundary/boundary';
import {
  PARTITIONED_BOUNDARY_GEPP,
  PartitionedBoundaryInstance,
  PartitionedBoundaryVoque,
} from '../boundary/partitionedBoundary';
import {
  COMMON_BOUNDARY_ROOT_GEPP,
  CommonBoundaryRootVoque,
} from '../common-boundary-root/commonBoundaryRoot';
import { LAYER_TRIE_GEPP, LayerTrieVoque } from '../layer/layerTrie';
import {
  PARTITION_FACT_GEPP,
  PartitionFactInstance,
  PartitionFactVoque,
} from './partitionFact';

/**
 * Creates a partition fact and a partitioned boundary from a boundary.
 */
export const getBoundaryPartition = buildEstinant({
  name: 'getBoundaryPartition',
})
  .fromHubblepup2<BoundaryVoque>({
    gepp: BOUNDARY_GEPP,
  })
  .andFromHubblepupTuple2<LayerTrieVoque, ['']>({
    gepp: LAYER_TRIE_GEPP,
    // TODO: make a more readable pattern for singleton collections
    framate: () => [''],
    croard: () => '',
  })
  .andFromHubblepupTuple2<CommonBoundaryRootVoque, ['']>({
    gepp: COMMON_BOUNDARY_ROOT_GEPP,
    // TODO: make a more readable pattern for singleton collections
    framate: () => [''],
    croard: () => '',
  })
  .toHubblepup2<PartitionFactVoque>({
    gepp: PARTITION_FACT_GEPP,
  })
  .toHubblepup2<PartitionedBoundaryVoque>({
    gepp: PARTITIONED_BOUNDARY_GEPP,
  })
  .onPinbe((boundary, [layerTrie], [commonBoundaryRoot]) => {
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
      [PARTITION_FACT_GEPP]: partitionFact,
      [PARTITIONED_BOUNDARY_GEPP]: new PartitionedBoundaryInstance({
        partitionFact,
        boundary,
      }),
    };
  })
  .assemble();
