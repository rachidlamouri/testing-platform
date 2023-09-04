import { buildEstinant } from '../../../adapter/estinant-builder/estinantBuilder';
import {
  COMMON_BOUNDARY_ROOT_GEPP,
  CommonBoundaryRootVoque,
} from '../common-boundary-root/commonBoundaryRoot';
import { BOUNDARY_GEPP, BoundaryVoque } from './boundary';
import {
  BOUNDARY_FACT_GEPP,
  BoundaryFactInstance,
  BoundaryFactVoque,
} from './boundaryFact';

/**
 * Instantiates a BoundaryFact from a boundary
 */
export const getBoundaryFact = buildEstinant({
  name: 'getBoundaryFact',
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
  .toHubblepup2<BoundaryFactVoque>({
    gepp: BOUNDARY_FACT_GEPP,
  })
  .onPinbe((boundary, [commonBoundaryRoot]) => {
    return new BoundaryFactInstance({
      boundary,
      commonBoundaryRoot,
    });
  })
  .assemble();
