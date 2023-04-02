import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { ITEM_B_GEPP, ItemBVoictent } from './itemB';
import { ITEM_C_GEPP, ItemCVoictent } from './itemC';

export const getVoictent = buildEstinant({
  name: 'getVoictent',
})
  .fromVoictent<ItemBVoictent>({
    gepp: ITEM_B_GEPP,
  })
  .toHubblepup<ItemCVoictent>({
    gepp: ITEM_C_GEPP,
  })
  .onPinbe((x) => x)
  .assemble();
