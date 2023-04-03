import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type ItemA = {
  value: number;
};

export type ItemAGrition = Grition<ItemA>;

export type ItemAOdeshin = OdeshinFromGrition<ItemAGrition>;

export const ITEM_A_GEPP = 'item-a';

export type ItemAGepp = typeof ITEM_A_GEPP;

export type ItemAVoictent = Voictent<ItemAGepp, ItemAOdeshin>;
