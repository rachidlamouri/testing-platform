import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Hubblepup } from '../../adapter/hubblepup';
import { Voictent } from '../../adapter/voictent';
import { ItemB } from './itemB';

export type ItemC = Tuple<ItemB>;

export type ItemCHubblepup = Hubblepup<ItemC>;

export const ITEM_C_GEPP = 'item-c';

export type ItemCGepp = typeof ITEM_C_GEPP;

export type ItemCVoictent = Voictent<ItemCGepp, ItemCHubblepup>;
