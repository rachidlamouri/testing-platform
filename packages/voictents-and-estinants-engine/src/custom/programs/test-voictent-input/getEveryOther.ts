import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { ITEM_A_GEPP, ItemAVoictent } from './itemA';
import { ITEM_B_GEPP } from './itemB';

let callCount = 0;

export const getEveryOther = buildEstinant({
  name: 'getEveryOther',
})
  .fromHubblepup<ItemAVoictent>({
    gepp: ITEM_A_GEPP,
  })
  .toHubblepupTuple({
    gepp: ITEM_B_GEPP,
  })
  .onPinbe((x) => {
    callCount += 1;

    if (callCount % 2 === 1) {
      return [x];
    }

    return [];
  })
  .assemble();
