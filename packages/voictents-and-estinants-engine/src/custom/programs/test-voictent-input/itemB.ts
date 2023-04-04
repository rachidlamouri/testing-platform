import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type ItemB = {
  value: number;
};

export type ItemBGrition = Grition<ItemB>;

export type ItemBOdeshin = OdeshinFromGrition<ItemBGrition>;

export const ITEM_B_GEPP = 'item-b';

export type ItemBGepp = typeof ITEM_B_GEPP;

export type ItemBVoictent = Voictent<ItemBGepp, ItemBOdeshin>;
