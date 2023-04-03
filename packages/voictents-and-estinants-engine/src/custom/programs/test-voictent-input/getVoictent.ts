import { buildEstinant } from '../../adapter/estinant-builder/estinantBuilder';
import { ITEM_B_GEPP, ItemBVoictent } from './itemB';
import { ITEM_C_GEPP, ItemCVoictent } from './itemC';
import { sharedContext } from './sharedContext';

export const getVoictent = buildEstinant({
  name: 'getVoictent',
})
  .fromOdeshinVoictent<ItemBVoictent>({
    gepp: ITEM_B_GEPP,
  })
  .toHubblepup<ItemCVoictent>({
    gepp: ITEM_C_GEPP,
  })
  .onPinbe((input) => {
    sharedContext.collectionCallCount += 1;

    const output = {
      zorn: `call-count-${sharedContext.collectionCallCount}`,
      grition: input,
    };

    return output;
  })
  .assemble();
