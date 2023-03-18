import { Grition } from '../../adapter/grition';
import { OdeshinFromGrition } from '../../adapter/odeshin';
import { Voictent } from '../../adapter/voictent';

export type InputC = unknown;

export type InputCGrition = Grition<InputC>;

export type InputCOdeshin = OdeshinFromGrition<InputCGrition>;

export const INPUT_C_GEPP = 'input-c';

export type InputCGepp = typeof INPUT_C_GEPP;

export type InputCVoictent = Voictent<InputCGepp, InputCOdeshin>;
