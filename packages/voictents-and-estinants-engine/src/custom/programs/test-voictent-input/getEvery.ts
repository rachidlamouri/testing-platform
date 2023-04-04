import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { ITEM_A_GEPP, ItemAVoictent } from './itemA';
import { ITEM_B_GEPP, ItemBVoictent } from './itemB';

export const getEvery = buildEstinant({
  name: 'getEvery',
})
  .fromHubblepup<ItemAVoictent>({
    gepp: ITEM_A_GEPP,
  })
  .toHubblepup<ItemBVoictent>({
    gepp: ITEM_B_GEPP,
  })
  .onPinbe((input) => input)
  .assemble();
