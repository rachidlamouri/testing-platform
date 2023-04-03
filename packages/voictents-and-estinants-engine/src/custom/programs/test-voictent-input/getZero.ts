import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { ITEM_A_GEPP, ItemAVoictent } from './itemA';
import { ITEM_B_GEPP } from './itemB';

export const getZero = buildEstinant({
  name: 'getZero',
})
  .fromHubblepup<ItemAVoictent>({
    gepp: ITEM_A_GEPP,
  })
  .toHubblepupTuple({
    gepp: ITEM_B_GEPP,
  })
  .onPinbe(() => {
    return [];
  })
  .assemble();
