import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { ITEM_A_GEPP, ItemAVoictent } from './itemA';
import { ITEM_B_GEPP } from './itemB';
import { sharedContext } from './sharedContext';

export const getOne = buildEstinant({
  name: 'getOne',
})
  .fromHubblepup<ItemAVoictent>({
    gepp: ITEM_A_GEPP,
  })
  .toHubblepupTuple({
    gepp: ITEM_B_GEPP,
  })
  .onPinbe((input) => {
    sharedContext.itemCallCount += 1;

    if (sharedContext.itemCallCount > 1) {
      return [];
    }

    return [input];
  })
  .assemble();
