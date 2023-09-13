import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
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
  .onPinbe((boundary, [commonBoundaryRoot]) => {
    const partitionFact = new PartitionFactInstance({
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
