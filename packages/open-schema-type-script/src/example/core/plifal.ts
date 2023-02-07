import { Gepp } from '../../core/gepp';
import { Quirm } from '../../core/quirm';
import { Odeshin, OdeshinGepp } from './odeshin';

/**
 * A Quirm that wraps an Odeshin
 */
export type Plifal<TGeppTuple extends Gepp[], TOdeshin extends Odeshin> = Quirm<
  TOdeshin,
  [OdeshinGepp, ...TGeppTuple]
>;
