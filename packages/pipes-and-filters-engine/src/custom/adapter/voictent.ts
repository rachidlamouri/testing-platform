import { Gepp } from '../../type-script-adapter/gepp';
import { Voictent } from '../../type-script-adapter/voictent';
import { Odeshin } from './odeshin';

export { Voictent } from '../../type-script-adapter/voictent';

export type OdeshinVoictent = Voictent<Gepp, Odeshin>;

export type OdeshinVoictentTuple = readonly OdeshinVoictent[];

export type OdeshinVoictentToGrition<TOdeshinVoictent extends OdeshinVoictent> =
  TOdeshinVoictent['hubblepupTuple'][number]['grition'];
