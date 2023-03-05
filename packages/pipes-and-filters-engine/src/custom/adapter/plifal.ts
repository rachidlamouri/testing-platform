import { Gepp } from '../../type-script-adapter/gepp';
import { Quirm } from '../../type-script-adapter/quirm';
import { isOdeshin, Odeshin } from './odeshin';

export type Plifal<TOdeshin extends Odeshin = Odeshin> = Quirm<{
  gepp: Gepp;
  hubblepup: TOdeshin;
}>;

export const isPlifal = (quirm: Quirm): quirm is Plifal =>
  isOdeshin(quirm.hubblepup);
