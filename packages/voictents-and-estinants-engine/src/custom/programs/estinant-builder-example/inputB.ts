import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type InputB = string;

export type InputBGrition = Grition<InputB>;

export type InputBOdeshin = OdeshinFromGrition<InputBGrition>;

export const INPUT_B_GEPP = 'input-b';

export type InputBGepp = typeof INPUT_B_GEPP;

export type InputBVoictent = Voictent<InputBGepp, InputBOdeshin>;
