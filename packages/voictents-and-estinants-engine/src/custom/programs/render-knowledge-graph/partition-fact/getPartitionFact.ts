import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import { BoundaryVoque, BOUNDARY_GEPP } from '../boundary/boundary';
import {
  CommonBoundaryRootVoque,
  COMMON_BOUNDARY_ROOT_GEPP,
} from '../common-boundary-root/commonBoundaryRoot';
import {
  PARTITION_FACT_GEPP,
  PartitionFactInstance,
  PartitionFactVoque,
} from './partitionFact';

/**
 * Creates a partition from a boundary and the common boundary root
 */
export const getPartitionFact = buildEstinant({
  name: 'getPartitionFact',
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
  .onPinbe((boundary, [commonBoundaryRoot]) => {
    return new PartitionFactInstance({
      boundary,
      commonBoundaryRoot,
    });
  })
  .assemble();
