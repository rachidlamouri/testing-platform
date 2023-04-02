import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';

export type ItemB = {
  value: string;
};

export type ItemBHubblepup = Hubblepup<ItemB>;

export const ITEM_B_GEPP = 'item-b';

export type ItemBGepp = typeof ITEM_B_GEPP;

export type ItemBVoictent = Voictent<ItemBGepp, ItemBHubblepup>;
