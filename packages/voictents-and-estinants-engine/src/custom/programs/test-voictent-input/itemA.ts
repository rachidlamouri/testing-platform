import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';

export type ItemA = {
  value: string;
};

export type ItemAHubblepup = Hubblepup<ItemA>;

export const ITEM_A_GEPP = 'item-a';

export type ItemAGepp = typeof ITEM_A_GEPP;

export type ItemAVoictent = Voictent<ItemAGepp, ItemAHubblepup>;
