import { Tuple } from '../../../utilities/semantic-types/tuple';
import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';
import { ItemB } from './itemB';

export type ItemC = Tuple<ItemB>;

export type ItemCGrition = Grition<ItemC>;

export type ItemCOdeshin = OdeshinFromGrition<ItemCGrition>;

export const ITEM_C_GEPP = 'item-c';

export type ItemCGepp = typeof ITEM_C_GEPP;

export type ItemCVoictent = Voictent<ItemCGepp, ItemCOdeshin>;
